import { FeatureCollection } from 'geojson'
import { LngLatLike } from 'mapbox-gl'

export interface IDeckglOptions {
  canvas: string
  container: string
  controller: boolean
  interactive: boolean
  maxZoom?: number
  minZoom?: number
  style: string
}

export interface IDeckglSettings {
  bearing: number
  center: LngLatLike
  latitude: number
  longitude: number
  pitch: number
  zoom: number
}

export interface IHexagonLayerDynamicProps {
  coverage: number
  elevationScale: number
  radius: number
  upperPercentile: number
}

export interface IHexagonLayerStaticProps {
  colorRange: number[][]
  elevationRange: number[]
  extruded: boolean
  id: string
  material: Record<string, any>
  pickable: boolean
  transitions: Record<string, number>
}

export interface IHTMLMarkerElement extends HTMLDivElement {
  visible: boolean
}

export interface IHttpParams {
  fields: string | undefined
  table: string | undefined
}

export interface ILayerElement {
  biosphere?: string
  deckgl?: string
  office?: string
  places?: string
  satellite?: string
  trails?: string
}

export interface ILayerElements {
  active: boolean
  id: string
  name: string
}

export interface ILayerIcon {
  id: string
  name: string
  src: string
  height: number
  width: number
}

export interface IMapboxOptions {
  container: string
  doubleClickZoom: boolean
  maxZoom: number
  minZoom: number
}

export interface IMapboxSettings {
  bearing: number
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
  active: boolean
  class: string
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
  paint?: any
  source?: any
  table?: string
  trails?: any
  type?: string
  visible?: boolean
  visibility?: string
}

export interface ITrail {
  center?: number[]
  name: string
  zoom?: number
}
