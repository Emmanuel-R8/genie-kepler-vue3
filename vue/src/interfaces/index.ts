import { FeatureCollection } from 'geojson'
import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'

export interface HttpParams {
  fields: string
  table: string
}

export interface Layer {
  active: boolean
  fields: string
  id: string
  layer: any
  layout: {
    visibility: string
  }
  paint: {
    'fill-color'?: string
    'fill-opacity'?: number
    'fill-outline-color'?: string
    'line-color'?: string
    'line-width'?: number
  }
  source: {
    data: FeatureCollection | Record<string, never>
    type: string
  }
  type: string
}

export interface MapOptions extends MapSettings {
  container: string
  doubleClickZoom: boolean
  maxZoom: number
  minZoom: number
}

export interface MapSettings {
  bearing: number
  bounds: LngLatBoundsLike
  center: LngLatLike
  pitch: number
  style: string
  zoom: number
}
