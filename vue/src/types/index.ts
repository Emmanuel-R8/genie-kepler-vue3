import { DSVRowArray } from 'd3-dsv'
import { Feature, FeatureCollection } from 'geojson'

import {
  IDeckglViewSettings,
  IHexagonLayerReactiveProps,
  ILayerElement,
  ILayers,
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

export type LogData = DSVRowArray<string> | Feature[] | FeatureCollection | State

export type NavigationControlPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export type State =
  | IDeckglViewSettings
  | IHexagonLayerReactiveProps
  | ILayerElement[]
  | ILayers
  | IMapStyle[]
  | IMapboxSettings
  | IModal
