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

export type DeckglProps = {
  canvas: string
  container: string
}

export type HexagonUIProps = {
  coverage: number
  elevationScale: number
  radius: number
  upperPercentile: number
  setHexagonLayerReactiveProps: (evt: Event) => void
  resetHexagonLayerReactiveProps: (evt: Event) => void
  returnToTrails: (evt: Event) => void
}

export type LayerElement =
  | 'biosphere'
  | 'biosphere-border'
  | 'deckgl'
  | 'office'
  | 'places'
  | 'satellite'
  | 'trails'

export type LayerElementProps = {
  click: (evt: Event) => void
  id: string
  isActive: boolean
  name: string
}

export type LayerIconProps = {
  alt: string
  click: (evt: Event) => void
  height: number
  id: string
  src: string
  width: number
}

export type LogData = DSVRowArray<string> | Feature[] | FeatureCollection | State

export type MapboxProps = {
  container: string
}

export type ModalProps = {
  isActive: boolean
}

export type NavigationControlPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export type State =
  | IDeckglViewSettings
  | IHexagonLayerReactiveProps
  | ILayerElement[]
  | ILayers
  | IMapStyle[]
  | IMapboxSettings
  | IModal
