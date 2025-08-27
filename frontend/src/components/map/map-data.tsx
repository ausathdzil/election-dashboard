// biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: Mapbox
// biome-ignore-all lint/style/noMagicNumbers: Mapbox
'use client';

import { useQuery } from '@tanstack/react-query';
import { bbox } from '@turf/bbox';
import mapboxgl, { type LngLatBoundsLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCitySummary } from '@/lib/data/news';
import type { ProvinceSummary } from '@/lib/types/news';

const INITIAL_LONGITUDE = 117.968_86;
const INITIAL_LATITUDE = -2.5669;
const INITIAL_ZOOM = 3.5;

const OPACITY = 0.8;

type MapDataProps = {
  summaryData: ProvinceSummary[];
};

export function MapData({ summaryData }: MapDataProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const { data: cityData } = useQuery({
    queryKey: ['citySummary', selectedProvince],
    queryFn: () => getCitySummary({ province: selectedProvince as string }),
    enabled: Boolean(selectedProvince),
  });

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    if (!mapContainerRef.current) {
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [INITIAL_LONGITUDE, INITIAL_LATITUDE],
      zoom: INITIAL_ZOOM,
    });
    mapRef.current = map;

    let hoveredPolygonId: string | number | null | undefined = null;

    map.on('load', () => {
      map.addSource('province', {
        type: 'geojson',
        data: './province.json',
        generateId: true,
      });

      const maxCount = Math.max(
        ...summaryData.map((item) => item.article_count)
      );

      const sortedCounts = summaryData
        .map((item) => item.article_count)
        .sort((a, b) => b - a);
      const secondHighest = sortedCounts[1] || maxCount;

      const colorStops = [
        [0, 'rgba(254, 226, 226, 0.3)'],
        [100, 'rgba(252, 165, 165, 0.4)'],
        [300, 'rgba(248, 113, 113, 0.5)'],
        [600, 'rgba(239, 68, 68, 0.6)'],
        [secondHighest, 'rgba(220, 38, 38, 0.7)'],
        [maxCount, 'rgba(127, 29, 29, 0.9)'],
      ];

      map.addLayer({
        id: 'province-fill',
        type: 'fill',
        source: 'province',
        layout: {},
        paint: {
          'fill-color': [
            'case',
            ['!=', ['feature-state', 'article_count'], null],
            [
              'interpolate',
              ['linear'],
              ['feature-state', 'article_count'],
              ...colorStops.flat(),
            ],
            'rgba(254, 226, 226, 0.3)',
          ],
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            OPACITY,
          ],
        },
      });

      map.addLayer({
        id: 'province-outline',
        type: 'line',
        source: 'province',
        layout: {},
        paint: {
          'line-color': '#DC2626',
          'line-width': 2,
        },
      });

      const setFeatureData = () => {
        const features = map.querySourceFeatures('province');
        for (const summary of summaryData) {
          const feature = features.find(
            (f) => f.properties?.PROVINSI === summary.province
          );
          if (feature?.id) {
            map.setFeatureState(
              { source: 'province', id: feature.id },
              { article_count: summary.article_count }
            );
          }
        }
      };

      if (map.isSourceLoaded('province')) {
        setFeatureData();
      } else {
        map.on('sourcedata', (e) => {
          if (e.sourceId === 'province' && e.isSourceLoaded) {
            setFeatureData();
            map.off('sourcedata', setFeatureData);
          }
        });
      }

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on('mousemove', 'province-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          popup
            .setLngLat(e.lngLat)
            .setHTML(
              `
              <div style="font-family: sans-serif; padding: 4px; color: black;">
                <strong>${feature.properties?.PROVINSI}</strong><br/>
                ${feature.state?.article_count || 0} articles
              </div>
            `
            )
            .addTo(map);

          if (hoveredPolygonId !== null) {
            map.setFeatureState(
              { source: 'province', id: hoveredPolygonId as number },
              { hover: false }
            );
          }
          hoveredPolygonId = feature.id;
          map.setFeatureState(
            { source: 'province', id: hoveredPolygonId as number },
            { hover: true }
          );
        }
      });

      map.on('mouseleave', 'province-fill', () => {
        popup.remove();
        if (hoveredPolygonId !== null) {
          map.setFeatureState(
            { source: 'province', id: hoveredPolygonId as number },
            { hover: false }
          );
        }
        hoveredPolygonId = null;
      });
    });

    map.on('click', 'province-fill', (e) => {
      if (e.features && e.features.length > 0) {
        const provinceName = e.features[0].properties?.PROVINSI;
        setSelectedProvince(provinceName);

        const boundaryBox = bbox(e.features[0]) as LngLatBoundsLike;
        map.fitBounds(boundaryBox, { padding: 40, duration: 1000 });
      }
    });

    return () => {
      map.remove();
    };
  }, [summaryData]);

  useEffect(() => {
    if (!(mapRef.current && cityData)) {
      return;
    }

    const map = mapRef.current;

    if (map.getSource('city')) {
      (map.getSource('city') as mapboxgl.GeoJSONSource).setData(
        cityData as GeoJSON.FeatureCollection
      );
    } else {
      map.addSource('city', {
        type: 'geojson',
        data: cityData as GeoJSON.FeatureCollection,
      });

      map.addLayer({
        id: 'city-circle',
        type: 'circle',
        source: 'city',
        paint: {
          'circle-color': '#1D4ED8',
          'circle-opacity': 0.75,
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 1,
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['get', 'article_count'],
            1,
            8,
            100,
            16,
            500,
            28,
          ],
        },
      });

      map.addLayer({
        id: 'city-article-count',
        type: 'symbol',
        source: 'city',
        layout: {
          'text-field': ['to-string', ['get', 'article_count']],
          'text-size': 10,
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': '#fff',
        },
      });

      map.addLayer({
        id: 'city-label',
        type: 'symbol',
        source: 'city',
        layout: {
          'text-field': ['get', 'city'],
          'text-size': 12,
          'text-offset': [0, 1.2],
        },
        paint: {
          'text-color': '#111',
          'text-halo-color': '#fff',
          'text-halo-width': 1,
        },
      });
    }
  }, [cityData]);

  return (
    <div className="flex gap-8">
      <div className="relative h-[500px] flex-1">
        <div
          className="h-full w-full"
          id="map-container"
          ref={mapContainerRef}
        />
      </div>
      <div className="min-w-[250px] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">No</TableHead>
              <TableHead className="w-[100px]">City</TableHead>
              <TableHead>Articles</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cityData ? (
              cityData.features.map((feature, index) => (
                <TableRow key={feature.properties.city}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{feature.properties.city}</TableCell>
                  <TableCell>{feature.properties.article_count}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center">No data.</TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>
                {
                  summaryData.find((data) => data.province === selectedProvince)
                    ?.article_count
                }
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
