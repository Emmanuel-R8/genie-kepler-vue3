import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces'

import { LngLatLike } from 'mapbox-gl'

export interface IDeckgl_ReactiveProps extends IAbstractReactiveState {
    canvas: string
    container: string
}

export interface IDeckgl_StaticProps extends IAbstractStaticState {
    bearing: number
    center: LngLatLike
    latitude: number
    longitude: number
    pitch: number
    zoom: number
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
