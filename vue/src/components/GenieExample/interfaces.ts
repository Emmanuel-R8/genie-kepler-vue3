import { LngLatLike } from 'mapbox-gl'

export interface IGenieExampleProps {
    canvas: string
    container: string
}

export interface IGenieExampleOptions extends IGenieExampleProps {
    controller: boolean
    id: string
    interactive: boolean
    maxPitch: number
    maxZoom: number
    minZoom: number
    style: string
}

export interface IGenieExampleViewSettings {
    bearing: number
    center: LngLatLike
    latitude: number
    longitude: number
    pitch: number
    zoom: number
}
