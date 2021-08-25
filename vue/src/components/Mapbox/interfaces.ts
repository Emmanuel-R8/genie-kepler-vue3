import { LngLatLike } from 'mapbox-gl'

export interface IMapbox_Props {
    container: string
}

export interface IMapbox_Settings extends IMapbox_Props {
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
    isActive: boolean
    url: string
}
