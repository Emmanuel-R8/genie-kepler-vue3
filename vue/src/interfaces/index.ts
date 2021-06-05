import { FeatureCollection } from 'geojson'
import { LngLatLike } from 'mapbox-gl'

export interface IDeckglOptions {
  canvas: string
  container: string
  controller: boolean
  interactive: boolean
  maxPitch: number
  maxZoom: number
  minZoom: number
  style: string
}

export interface IDeckglViewSettings {
  bearing: number
  center: LngLatLike
  latitude: number
  longitude: number
  pitch: number
  zoom: number
}

export interface IHexagonLayerReactiveProps {
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
  isActive: boolean
  isHidden: boolean
}

export interface IHttpParams {
  fields: string
  table: string
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
  id: string
  isActive: boolean
  name: string
}

export interface ILayerIcon {
  height: number
  id: string
  name: string
  src: string
  width: number
}

export interface IMapStyle {
  active: string
  id: string
  isActive: boolean
  outdoors: any
  satellite: any
  url: string
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

export interface IMarker {
  fields: string
  id: string
}

export interface IModal {
  class: string
  isActive: boolean
}

export interface IStore {
  getState: (key: string) => Record<string, any>
  setState: (key: string, payload: Record<string, any>) => void
  state: Record<string, any>
}

export interface IStyleLayer extends IMarker {
  data: Record<string, never> | FeatureCollection
  source: any
}

export interface ITrail {
  center?: LngLatLike
  name: string
  zoom?: number
}
