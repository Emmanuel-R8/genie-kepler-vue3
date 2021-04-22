import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'

export interface MapOptions extends MapSettings {
  accessToken: string
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
