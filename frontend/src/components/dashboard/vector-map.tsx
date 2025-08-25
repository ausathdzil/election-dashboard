// biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: Mapbox
// biome-ignore-all lint/style/noMagicNumbers: Mapbox
'use client';

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useQuery } from '@tanstack/react-query';
import mapboxgl, { type TargetFeature } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCitySummary } from '@/lib/data';
import type { ProvinceSummary } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Switch } from '../ui/switch';

const INITIAL_LONGITUDE = 117.968_86;
const INITIAL_LATITUDE = -2.5669;
const INITIAL_ZOOM = 4;
const OPACITY = 0.8;

type MapDataProps = {
  summaryData: ProvinceSummary[];
};

export function VectorMap({ summaryData }: MapDataProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const selectedFeatureRef = useRef<TargetFeature | null>(null);

  const [activeLayerIds, setActiveLayerIds] = useState<string[]>([
    'province-fill',
    'province-outline',
    'province-hover-outline',
    'city-circle',
    'city-article-count',
    'city-label',
  ]);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [selectedFeature, setSelectedFeature] = useState<TargetFeature | null>(
    null
  );

  const { data: cityData, isLoading } = useQuery({
    queryKey: ['citySummary', selectedFeature?.properties.province],
    queryFn: () =>
      getCitySummary({
        province: selectedFeature?.properties.province as string,
      }),
    enabled: Boolean(selectedFeature?.properties.province),
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
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    let _hoveredProvince: string | null = null;

    map.on('load', () => {
      if (!API_URL) {
        return;
      }
      setMapLoaded(true);

      map.addSource('geographies', {
        type: 'vector',
        tiles: [`${API_URL}/tiles/{z}/{x}/{y}`],
        maxzoom: 14,
        promoteId: { geographies: 'ogc_fid' },
      });

      const maxCount = Math.max(
        ...summaryData.map((item) => item.article_count)
      );
      const sortedCounts = summaryData
        .map((item) => item.article_count)
        .sort((a, b) => b - a);
      const secondHighest = sortedCounts[1] || maxCount;

      const colorStops: (number | string)[] = [
        0,
        'rgba(254, 226, 226, 0.3)',
        100,
        'rgba(252, 165, 165, 0.4)',
        300,
        'rgba(248, 113, 113, 0.5)',
        600,
        'rgba(239, 68, 68, 0.6)',
        secondHighest,
        'rgba(220, 38, 38, 0.7)',
        maxCount,
        'rgba(127, 29, 29, 0.9)',
      ];

      map.addLayer({
        id: 'province-fill',
        type: 'fill',
        source: 'geographies',
        'source-layer': 'geographies',
        filter: ['==', ['get', 'feature_type'], 'province'],
        layout: {},
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'article_count'],
            ...colorStops,
          ],
          'fill-opacity': OPACITY,
        },
      });

      map.addLayer({
        id: 'province-outline',
        type: 'line',
        source: 'geographies',
        'source-layer': 'geographies',
        filter: ['==', ['get', 'feature_type'], 'province'],
        layout: {},
        paint: {
          'line-color': '#DC2626',
          'line-width': 2,
        },
      });

      map.addLayer({
        id: 'province-hover-outline',
        type: 'line',
        source: 'geographies',
        'source-layer': 'geographies',
        filter: ['==', ['get', 'feature_type'], 'province'],
        layout: {},
        paint: {
          'line-color': '#F59E0B',
          'line-width': 3,
        },
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on('mousemove', 'province-fill', (e) => {
        if (!(e.features && e.features.length > 0)) {
          return;
        }
        const feature = e.features[0];
        const provinceName = feature.properties?.province as string | undefined;
        if (!provinceName) {
          return;
        }

        const count =
          (feature.properties?.article_count as number | undefined) || 0;
        popup
          .setLngLat(e.lngLat)
          .setHTML(
            `
            <div style="font-family: sans-serif; padding: 4px; color: black;">
              <strong>${provinceName}</strong><br/>
              ${count} articles
            </div>
          `
          )
          .addTo(map);

        _hoveredProvince = provinceName;
        map.setFilter('province-hover-outline', [
          '==',
          ['get', 'province'],
          provinceName,
        ]);
      });

      map.on('mouseleave', 'province-fill', () => {
        popup.remove();
        _hoveredProvince = null;
        map.setFilter('province-hover-outline', [
          '==',
          ['get', 'province'],
          '',
        ]);
      });

      map.on('click', 'province-fill', (e) => {
        if (!(e.features && e.features.length > 0)) {
          return;
        }

        const feature = e.features[0];

        if (selectedFeatureRef.current) {
          setSelectedFeature(null);
        }

        if (feature && feature.properties?.feature_type === 'province') {
          setSelectedFeature(feature as TargetFeature);
        }
      });

      map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['province-fill'],
        });

        if (features.length === 0 && selectedFeatureRef.current) {
          setSelectedFeature(null);
        }
      });

      map.addLayer({
        id: 'city-circle',
        type: 'circle',
        source: 'geographies',
        'source-layer': 'geographies',
        filter: [
          'all',
          ['==', ['get', 'feature_type'], 'city'],
          ['>', ['get', 'article_count'], 0],
        ],
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
        source: 'geographies',
        'source-layer': 'geographies',
        filter: [
          'all',
          ['==', ['get', 'feature_type'], 'city'],
          ['>', ['get', 'article_count'], 0],
        ],
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
        source: 'geographies',
        'source-layer': 'geographies',
        filter: [
          'all',
          ['==', ['get', 'feature_type'], 'city'],
          ['>', ['get', 'article_count'], 0],
        ],
        layout: {
          'text-field': ['get', 'name'],
          'text-size': 12,
          'text-offset': [0, 1.2],
        },
        paint: {
          'text-color': '#111',
          'text-halo-color': '#fff',
          'text-halo-width': 1,
        },
      });
    });

    const fullScreenControl = new mapboxgl.FullscreenControl({
      container: document.querySelector('#map-container') as HTMLElement,
    });
    const navigationControl = new mapboxgl.NavigationControl();
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken as string,
      useBrowserFocus: true,
      mapboxgl,
    });

    map.addControl(geocoder as unknown as mapboxgl.IControl);
    map.addControl(fullScreenControl);
    map.addControl(navigationControl);

    document.addEventListener('fullscreenchange', () => {
      setFullScreen(document.fullscreenElement !== null);
    });

    map.on('idle', () => {
      if (!(map.getLayer('province-fill') && map.getLayer('city-circle'))) {
        return;
      }
    });

    return () => {
      map.remove();
    };
  }, [summaryData]);

  useEffect(() => {
    selectedFeatureRef.current = selectedFeature;
  }, [selectedFeature]);

  useEffect(() => {
    if (!mapLoaded) {
      return;
    }

    const map = mapRef.current;

    const allLayerIds = [
      'province-fill',
      'province-outline',
      'province-hover-outline',
      'city-circle',
      'city-article-count',
      'city-label',
    ];

    for (const layerId of allLayerIds) {
      if (activeLayerIds.includes(layerId)) {
        map?.setLayoutProperty(layerId, 'visibility', 'visible');
      } else {
        map?.setLayoutProperty(layerId, 'visibility', 'none');
      }
    }
  }, [activeLayerIds, mapLoaded]);

  const handleFlyTo = (coordinates: [number, number]): void => {
    mapRef.current?.flyTo({
      center: coordinates,
      zoom: 10,
    });
  };

  const handleSwitchLayer = (layerGroup: 'province' | 'city') => {
    const provinceLayers = [
      'province-fill',
      'province-outline',
      'province-hover-outline',
    ];
    const cityLayers = ['city-circle', 'city-article-count', 'city-label'];

    const layersToToggle =
      layerGroup === 'province' ? provinceLayers : cityLayers;
    const allLayersCurrentlyVisible = layersToToggle.every((layer) =>
      activeLayerIds.includes(layer)
    );

    if (allLayersCurrentlyVisible) {
      setActiveLayerIds(
        activeLayerIds.filter((id) => !layersToToggle.includes(id))
      );
    } else {
      const newActiveLayers = [...activeLayerIds];
      for (const layer of layersToToggle) {
        if (!newActiveLayers.includes(layer)) {
          newActiveLayers.push(layer);
        }
      }
      setActiveLayerIds(newActiveLayers);
    }
  };

  const isProvinceVisible = () => {
    return [
      'province-fill',
      'province-outline',
      'province-hover-outline',
    ].every((layer) => activeLayerIds.includes(layer));
  };

  const isCityVisible = () => {
    return ['city-circle', 'city-article-count', 'city-label'].every((layer) =>
      activeLayerIds.includes(layer)
    );
  };

  return (
    <div className={cn('relative h-[500px] flex-1', fullScreen && 'h-screen')}>
      <div className="size-full" ref={mapContainerRef} />
      <div className="absolute top-2 left-2 z-50 flex flex-col gap-2">
        <div className="flex w-[150px] flex-col bg-black/50 p-4">
          <div className="flex items-center justify-between">
            <span>Province</span>
            <Switch
              checked={isProvinceVisible()}
              onCheckedChange={() => handleSwitchLayer('province')}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>City</span>
            <Switch
              checked={isCityVisible()}
              onCheckedChange={() => handleSwitchLayer('city')}
            />
          </div>
        </div>
        {selectedFeature && (
          <div className="size-fit max-w-[500px] bg-black/50 p-2">
            <div className="text-center font-bold">
              {selectedFeature.properties.name ||
                selectedFeature.properties.province}
            </div>
            {isLoading ? (
              <div className="text-sm">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="text-black">
                    <TableHead>City</TableHead>
                    <TableHead>Articles</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cityData?.features.map((feature) => (
                    <TableRow
                      className="hover:cursor-pointer"
                      key={feature.properties.city || feature.properties.name}
                      onClick={() =>
                        handleFlyTo(
                          feature.geometry.coordinates as [number, number]
                        )
                      }
                    >
                      <TableCell>
                        {feature.properties.city || feature.properties.name}
                      </TableCell>
                      <TableCell>{feature.properties.article_count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>
                      {selectedFeature.properties.article_count}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
