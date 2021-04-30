import { FeatureCollection } from 'geojson'
import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'

export interface HTMLMarkerElement extends HTMLDivElement {
  visible: boolean
}

export interface HttpParams {
  fields: string
  table: string
}

export interface Layer {
  fields: string
  data: FeatureCollection | Record<string, never>
  id: string
  layer: Record<string, string>
  layout: Record<string, string>
  paint: Record<string, string>
  'fill-color'?: string
  'fill-opacity'?: number
  'fill-outline-color'?: string
  'line-color'?: string
  'line-width'?: number
  source: Record<string, any>
  table: string
  type: string
  visibility: string
}

export interface LayerElements {
  active: boolean
  class: string
  id: string
  name: string
}

export interface MapSettings {
  bearing: number
  bounds: LngLatBoundsLike
  center: LngLatLike
  pitch: number
  style: string
  zoom: number
}

export interface MapOptions extends MapSettings {
  container: string
  doubleClickZoom: boolean
  maxZoom: number
  minZoom: number
}

export interface Marker {
  fields: string
  table: string
}

export interface MarkerVisibility {
  office: {
    hidden: boolean
    visible: boolean
  }
  places: {
    hidden: boolean
    visible: boolean
  }
  trails: {
    hidden: boolean
    visible: boolean
  }
}
