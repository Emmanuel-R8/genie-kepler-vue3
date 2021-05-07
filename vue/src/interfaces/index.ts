import { FeatureCollection } from 'geojson'
import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'

export interface IHTMLMarkerElement extends HTMLDivElement {
  visible: boolean
}

export interface IHttpParams {
  fields: string | undefined
  table: string | undefined
}

export interface ILayerElement {
  active: boolean
  id: string
  name: string
}

export interface IMapSetting {
  bearing: number
  bounds: LngLatBoundsLike | undefined
  center: LngLatLike
  pitch: number
  style: string
  zoom: number
}

export interface IMapStyle {
  active: string
  id: string
  outdoors: any
  satellite: any
  url: string
  visible: boolean
}

export interface IMarker {
  fields: string
  table: string
}

export interface IModal {
  class: string
  show: boolean
}

export interface IStore {
  getters: any
  setters: any
  state: Record<string, any>
}

export interface IStyleLayer {
  biosphere?: any
  'biosphere-border'?: any
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
  trails?: any
  type?: string
  visible?: boolean
  visibility?: string
}
