declare module '@mapbox/mapbox-gl-geocoder' {
  import type mapboxgl from 'mapbox-gl';

  export interface MapboxGeocoderOptions {
    accessToken: string;
    mapboxgl: typeof mapboxgl;
    placeholder?: string;
    proximity?: mapboxgl.LngLatLike;
    bbox?: [number, number, number, number];
    language?: string | string[];
    countries?: string | string[];
    types?: string;
    minLength?: number;
    limit?: number;
    marker?: boolean | mapboxgl.MarkerOptions;
    useBrowserFocus?: boolean;
    zoom?: number;
    flyTo?: boolean | mapboxgl.FlyToOptions;
  }

  export default class MapboxGeocoder {
    constructor(options: MapboxGeocoderOptions);

    addTo(container: string | HTMLElement | mapboxgl.Map): this;
    remove(): this;

    on(
      type: 'results' | 'result' | 'loading' | 'clear' | 'error',
      listener: (event: unknown) => void
    ): this;
    off(type: string, listener: (event: unknown) => void): this;

    query(query: string): this;
    setLanguage(language: string | string[]): void;
    getLanguage(): string | string[] | undefined;

    setProximity(proximity: mapboxgl.LngLatLike): void;
    getProximity(): mapboxgl.LngLatLike | undefined;

    setBbox(bbox: [number, number, number, number] | null): void;
    getBbox(): [number, number, number, number] | null | undefined;

    setTypes(types: string): void;
    getTypes(): string | undefined;

    setZoom(zoom: number): void;
    getZoom(): number | undefined;

    setFlyTo(flyTo: boolean | mapboxgl.FlyToOptions): void;
    getFlyTo(): boolean | mapboxgl.FlyToOptions | undefined;

    fitsBounds(
      bounds: mapboxgl.LngLatBoundsLike,
      options?: mapboxgl.FitBoundsOptions
    ): void;
  }
}
