import { IAbstractReactiveState, IAbstractStaticState } from '@/common_services/State/interfaces'
import { DSVRowArray } from 'd3-dsv'
import { Feature, FeatureCollection } from 'geojson'

export type LogData =
    | DSVRowArray<string>
    | Feature[]
    | FeatureCollection
    | IAbstractReactiveState
    | IAbstractStaticState
    | string

export type NavigationControlPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
