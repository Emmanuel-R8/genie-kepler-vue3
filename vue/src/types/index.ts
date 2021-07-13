import { DSVRowArray } from 'd3-dsv'
import { Feature, FeatureCollection } from 'geojson'

import {
  IDeckglViewSettings,
  IHexagonLayerProps,
  ILayerElement,
  ILayerVisibility,
  IMapStyle,
  IMapboxSettings,
  IModal
} from '@/interfaces'

export type LayerElement =
  | 'biosphere'
  | 'biosphere-border'
  | 'deckgl'
  | 'office'
  | 'places'
  | 'satellite'
  | 'trails'

export type LogData =
  | DSVRowArray<string>
  | Feature[]
  | FeatureCollection
  | ReactiveState
  | StaticState
  | string

export type NavigationControlPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export type ReactiveState = IHexagonLayerProps | ILayerElement[] | IModal

export type StaticState = IDeckglViewSettings | ILayerVisibility | IMapStyle[] | IMapboxSettings
