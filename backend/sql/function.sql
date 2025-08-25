CREATE OR REPLACE FUNCTION public.generate_tile(
    z integer,
    x integer,
    y integer
)
RETURNS bytea
AS $$
DECLARE
    mvt bytea;
    tile_bounds geometry;
BEGIN
    -- Get the tile bounds in Web Mercator (EPSG:3857)
    tile_bounds := ST_TileEnvelope(z, x, y);
    
    WITH
    -- bounds: same tile envelope in two SRIDs
    --  - tb_3857: used by ST_AsMVTGeom (expects Web Mercator)
    --  - tb_4326: used for fast, index-backed spatial filtering (matches table SRID)
    bounds AS (
        SELECT
            tile_bounds AS tb_3857,
            ST_Transform(tile_bounds, 4326) AS tb_4326
    ),
    -- Get news counts for provinces
    province_counts AS (
        SELECT n.province, COUNT(n.id) AS article_count
        FROM public.news AS n
        WHERE n.province IS NOT NULL
        GROUP BY n.province
    ),
    -- Get news counts for cities
    city_counts AS (
        SELECT n.city, n.province, COUNT(n.id) AS article_count
        FROM public.news AS n
        WHERE n.province IS NOT NULL AND n.city IS NOT NULL
        GROUP BY n.city, n.province
    ),
    -- Get provinces that intersect with the tile bounds (zoom-based visibility)
    provinces AS (
        SELECT
            -- ST_AsMVTGeom clips and reprojects geometries into the tile space (4096 extent)
            -- We simplify in meters (Web Mercator) at lower high-zooms to keep tiles small
            ST_AsMVTGeom(
                CASE
                    WHEN z <= 9 THEN ST_SimplifyPreserveTopology(
                        ST_Transform(ST_MakeValid(p.wkb_geometry), 3857),
                        200
                    )
                    ELSE ST_Transform(ST_MakeValid(p.wkb_geometry), 3857)
                END,
                tile_bounds,            -- target tile envelope (3857)
                4096,  -- tile resolution
                256    -- buffer size
            ) AS geom,
            ('p-' || p.ogc_fid) AS feature_id,
            p.provinsi AS name,
            p.provinsi AS province,
            COALESCE(pc.article_count, 0) AS article_count,
            'province' AS feature_type
        FROM public.province AS p
        LEFT JOIN province_counts AS pc ON pc.province = p.provinsi
        CROSS JOIN bounds b
        WHERE z >= 8
            AND p.wkb_geometry IS NOT NULL
            AND ST_IsValid(p.wkb_geometry)
            AND p.wkb_geometry && b.tb_4326  -- fast bbox check (uses GIST index)
            AND ST_Intersects(p.wkb_geometry, b.tb_4326) -- exact intersection in table SRID
    ),
    -- Get cities that intersect with the tile bounds (high zoom only)
    cities AS (
        SELECT
            -- Use a representative point for each city polygon for circles/labels
            ST_AsMVTGeom(
                ST_Transform(ST_PointOnSurface(ST_MakeValid(c.wkb_geometry)), 3857),
                tile_bounds,            -- target tile envelope (3857)
                4096,  -- tile resolution
                256    -- buffer size
            ) AS geom,
            ('c-' || c.ogc_fid) AS feature_id,
            c.wadmkk AS name,
            c.wadmpr AS province,
            COALESCE(cc.article_count, 0) AS article_count,
            'city' AS feature_type
        FROM public.city_regency AS c
        LEFT JOIN city_counts AS cc ON cc.city = c.wadmkk AND cc.province = c.wadmpr
        CROSS JOIN bounds b
        WHERE z >= 8
            AND c.wkb_geometry IS NOT NULL
            AND ST_IsValid(c.wkb_geometry)
            AND COALESCE(cc.article_count, 0) > 0
            AND c.wkb_geometry && b.tb_4326  -- fast bbox check (uses GIST index)
            AND ST_Intersects(c.wkb_geometry, b.tb_4326) -- exact intersection in table SRID
    ),
    -- Combine all features into a single layer
    all_features AS (
        -- One vector tile layer named 'geographies' with both provinces and cities
        SELECT * FROM provinces
        UNION ALL
        SELECT * FROM cities
    )
    -- ST_AsMVT packs the features into an MVT blob; 'geom' is the geometry column name
    SELECT ST_AsMVT(tile, 'geographies', 4096, 'geom') INTO mvt
    FROM (
        SELECT * FROM all_features WHERE geom IS NOT NULL
    ) AS tile;

    RETURN mvt;
END;
$$
LANGUAGE plpgsql
STABLE;