import { LngLatLike } from 'mapbox-gl'

export interface IDeckgl_ReactiveProps {
    canvas: string
    container: string
}

export interface IDeckgl_Settings extends IDeckgl_ReactiveProps {
    controller: boolean
    id: string
    interactive: boolean
    maxPitch: number
    maxZoom: number
    minZoom: number
    style: string
}

export interface IDeckglView_Settings {
    bearing: number
    center: LngLatLike
    latitude: number
    longitude: number
    pitch: number
    zoom: number
}
