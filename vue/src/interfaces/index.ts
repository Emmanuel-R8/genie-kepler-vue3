import { FeatureCollection } from 'geojson'
import { LngLatLike } from 'mapbox-gl'

export interface IHexagonParams {
  coverage: number
  elevationScale: number
  radius: number
  upperPercentile: number
}

export interface IHexagonProps {
  colorRange: number[][]
  elevationRange: number[]
  extruded: boolean
  id: string
  material: Record<string, any>
  opacity: number
}

export interface IHexagonSettings {
  bearing: number
  center: LngLatLike
  pitch: number
  zoom: number
}

export interface IHTMLMarkerElement extends HTMLDivElement {
  visible: boolean
}

export interface IHttpParams {
  fields: string | undefined
  table: string | undefined
}

export interface ILayer {
  biosphere?: string
  deckgl?: string
  office?: string
  places?: string
  satellite?: string
  trails?: string
}

export interface ILayerElement {
  active: boolean
  id: string
  name: string
}

export interface IMapOptions {
  container: string
  doubleClickZoom: boolean
  maxZoom: number
  minZoom: number
  style?: string
}

export interface IMapSettings extends IHexagonSettings {
  style: string
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
