import { FeatureCollection } from 'geojson'

import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces'
import { IMarker } from '../Marker/interfaces'

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

export interface ILayerElement_ReactiveProps extends IAbstractReactiveState {
    height: number
    src: string
    width: number
    id: string
    isActive: boolean
    name: string
}

export type ILayerElement_StaticProps = IAbstractStaticState
