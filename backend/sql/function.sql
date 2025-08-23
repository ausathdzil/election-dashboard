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
            ST_AsMVTGeom(
                CASE 
                    WHEN z <= 6 THEN ST_Transform(ST_Simplify(ST_MakeValid(p.wkb_geometry), 0.01), 3857)
                    ELSE ST_Transform(ST_MakeValid(p.wkb_geometry), 3857)
                END,
                tile_bounds,
                4096,  -- tile resolution
                256    -- buffer size
            ) AS geom,
            p.provinsi AS name,
            p.provinsi AS province,
            COALESCE(pc.article_count, 0) AS article_count,
            'province' AS feature_type
        FROM public.province AS p
        LEFT JOIN province_counts AS pc ON pc.province = p.provinsi
        WHERE z >= 8  -- Only show provinces between zoom 5-10
            AND p.wkb_geometry IS NOT NULL 
            AND ST_IsValid(p.wkb_geometry)
            AND ST_Intersects(
                ST_Transform(ST_MakeValid(p.wkb_geometry), 3857), 
                tile_bounds  -- No buffer - only viewport data
            )
    ),
    -- Get cities that intersect with the tile bounds (high zoom only)
    cities AS (
        SELECT
            ST_AsMVTGeom(
                ST_Transform(ST_PointOnSurface(ST_MakeValid(c.wkb_geometry)), 3857), 
                tile_bounds,
                4096,  -- tile resolution
                256    -- buffer size
            ) AS geom,
            c.wadmkk AS name,
            c.wadmpr AS province,
            COALESCE(cc.article_count, 0) AS article_count,
            'city' AS feature_type
        FROM public.city_regency AS c
        LEFT JOIN city_counts AS cc ON cc.city = c.wadmkk AND cc.province = c.wadmpr
        WHERE z >= 8  -- Only show cities at zoom 8 and above
            AND c.wkb_geometry IS NOT NULL 
            AND ST_IsValid(c.wkb_geometry)
            AND COALESCE(cc.article_count, 0) > 0  -- Only cities with articles
            AND ST_Intersects(
                ST_Transform(ST_MakeValid(c.wkb_geometry), 3857), 
                tile_bounds  -- No buffer - only viewport data
            )
    ),
    -- Combine all features into a single layer
    all_features AS (
        SELECT * FROM provinces
        UNION ALL
        SELECT * FROM cities
    )
    SELECT ST_AsMVT(tile, 'geographies', 4096, 'geom') INTO mvt
    FROM (
        SELECT * FROM all_features WHERE geom IS NOT NULL
    ) AS tile;

    RETURN mvt;
END;
$$
LANGUAGE plpgsql
IMMUTABLE;