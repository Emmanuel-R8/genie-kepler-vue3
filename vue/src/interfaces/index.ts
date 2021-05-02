import { FeatureCollection } from 'geojson'
import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'

export interface HTMLMarkerElement extends HTMLDivElement {
  visible: boolean
}

export interface HttpParams {
  fields: string | undefined
  table: string | undefined
}

export interface LayerElement {
  active: boolean
  id: string
  name: string
}

export interface LayerElements {
  layerElements: LayerElement[]
}

export interface MapSetting {
  bearing: number
  bounds: LngLatBoundsLike | undefined
  center: LngLatLike
  pitch: number
  style: string
  zoom: number
}

export interface MapSettings {
  mapSettings: MapSetting
}

export interface MapStyle {
  active: string
  outdoors: {
    id: string
    url: string
    visible: boolean
  }
  satellite: {
    id: string
    url: string
    visible: boolean
  }
}

export interface MapStyles {
  mapStyles: MapStyle
}

export interface Marker {
  fields: string
  table: string
}

export interface StyleLayer {
  biosphere?: Record<string, boolean>
  'biosphere-border'?: Record<string, boolean>
  fields?: string
  data?: Record<string, never> | FeatureCollection
  'fill-color'?: string
  'fill-opacity'?: number
  'fill-outline-color'?: string
  id?: string
  layer?: any
  layout?: Record<string, string>
  'line-color'?: string
  'line-width'?: number
  paint?: Record<string, string>
  source?: any
  table?: string
  trails?: Record<string, boolean>
  type?: string
  visible?: boolean
  visibility?: string
}

export interface StyleLayers {
  styleLayers: StyleLayer
}
