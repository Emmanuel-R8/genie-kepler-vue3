import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces'

import { LngLatLike } from 'mapbox-gl'

export interface IMapbox_ReactiveProps extends IAbstractReactiveState {
    container: string
}

export interface IMapbox_Settings extends IMapbox_ReactiveProps {
    doubleClickZoom: boolean
    maxZoom: number
    minZoom: number
}

export interface IMapbox_StaticProps extends IAbstractStaticState {
    bearing: number
    center: LngLatLike
    pitch: number
    style: string
    zoom: number
}

export interface IMapStyle_ReactiveProps {
    isActive: boolean
    url: string
}

export interface IMapStyle_StaticProps {
    unused: string
}
