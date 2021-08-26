import { LngLatLike } from 'mapbox-gl'

export interface ITrail {
    center?: LngLatLike
    name: string
    zoom?: number
}
