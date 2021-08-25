import { DSVRowArray } from 'd3-dsv'
import { Feature, FeatureCollection } from 'geojson'

import { IDeckglView_Settings } from '../components/Deckgl/interfaces'

import { IHexagonLayer_ReactiveProps } from '../components/Hexagon/interfaces'

import { ILayerElement } from '../components/LayerElement/interfaces'

import { ILayerVisibility } from '../components/LayerElements/interfaces'

import { IMapStyle, IMapboxSettings } from '../components/Mapbox/interfaces'

import { IModal } from '../components/Modal/interfaces'

export type LayerElement = 'biosphere' | 'biosphere-border' | 'deckgl' | 'office' | 'places' | 'satellite' | 'trails'

export type LogData = DSVRowArray<string> | Feature[] | FeatureCollection | ReactiveState | StaticState | string

export type NavigationControlPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export type ReactiveState = IHexagonLayer_ReactiveProps | ILayerElement[] | IModal

export type StaticState = IDeckglView_Settings | ILayerVisibility | IMapStyle[] | IMapboxSettings
