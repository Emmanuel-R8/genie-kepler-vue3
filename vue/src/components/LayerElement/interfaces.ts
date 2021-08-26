import { FeatureCollection } from 'geojson'

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
