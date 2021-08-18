// All additional types in this app are implemented as interfaces. They are reimported in the
// `types/index.ts` deifinitions.
// The only exception are the `enums` defined as `types` in that file, instead of `interfaces`.
// Typescript `interfaces` are what other languages call `structs`, whereas typescript
// `types` are more like type aliases.

import { AxiosResponse } from 'axios'
import { FeatureCollection } from 'geojson'
import { LngLatLike } from 'mapbox-gl'

export interface IDeckglOptions extends IDeckglProps {
  controller: boolean
  id: string
  interactive: boolean
  maxPitch: number
  maxZoom: number
  minZoom: number
  style: string
}

export interface IDeckglProps {
  canvas: string
  container: string
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

export interface IHttpResponse<F = FeatureCollection, R = Record<string, string>>
  extends AxiosResponse {
  data: F
  token: R
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

export interface ILayerElement extends ILayerElementProps {
  height: number
  src: string
  width: number
}

export interface ILayerElementProps {
  id: string
  isActive: boolean
  name: string
}

export interface ILayerElements {
  biosphere: string
  deckgl: string
  office: string
  places: string
  satellite: string
  trails: string
}

export interface ILayerIconProps {
  alt: string
  height: number
  id: string
  src: string
  width: number
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

export interface IMapboxOptions extends IMapboxProps {
  doubleClickZoom: boolean
  maxZoom: number
  minZoom: number
}

export interface IMapboxProps {
  container: string
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
