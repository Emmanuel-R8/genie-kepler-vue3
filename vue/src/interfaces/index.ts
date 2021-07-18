import { FeatureCollection } from 'geojson'
import { LngLatLike } from 'mapbox-gl'

export interface IDeckglOptions {
  canvas: string
  container: string
  controller: boolean
  id: string
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

export interface IHexagonLayerProps {
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
  material: {
    ambient: number
    diffuse: number
    shininess: number
    specularColor: number[]
  }
  pickable: boolean
  transitions: {
    coverage: number
    elevationScale: number
  }
}

export interface IHTMLMarkerElement extends HTMLDivElement {
  isActive: boolean
  isHidden: boolean
}

export interface IHttpParams {
  fields: string
  table: string
}

export interface ILayer extends IMarker {
  type: string
  source: {
    type: string
    data: Record<string, never> | FeatureCollection
  }
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
}

export interface ILayerElement {
  height: number
  id: string
  isActive: boolean
  name: string
  src: string
  width: number
}

export interface ILayerElements {
  biosphere: string
  deckgl: string
  office: string
  places: string
  satellite: string
  trails: string
}

export interface ILayerVisibility {
  biosphere: {
    isActive: boolean
  }
  'biosphere-border': {
    isActive: boolean
  }
  trails: {
    isActive: boolean
  }
}

export interface IMapStyle {
  isActive: boolean
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
  isActive: boolean
}

export interface ITrail {
  center?: LngLatLike
  name: string
  zoom?: number
}
