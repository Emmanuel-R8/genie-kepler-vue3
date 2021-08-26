import { Container, Service } from 'typedi'
import { reactive } from 'vue'
import cloneDeep from 'lodash.clonedeep'

import { States } from '@/enums'
import { Log_Service } from '@/common_services'
import { ReactiveState, StaticState } from '@/types'

import { deckgl_Config } from '../components/Deckgl/config'
import { IDeckglView_Settings, IDeckgl_ReactiveProps } from '../components/Deckgl/interfaces'
import { Deckgl_Service } from '../components/Deckgl/services'

import { hexagonLayer_Config } from '../components/Hexagon/config'
import { IHexagonLayer_ReactiveProps } from '../components/Hexagon/interfaces'

import { layerVisibility_Config } from '../components/LayerElement/config'
import { ILayerElement } from '../components/LayerElement/interfaces'

import { layerElements_Config } from '../components/LayerElements/config'
import { ILayerVisibility } from '../components/LayerElements/interfaces'

import { mapbox_Config } from '../components/Mapbox/config'
import { IMapStyle, IMapboxSettings } from '../components/Mapbox/interfaces'

import { modal_Config } from '../components/Modal/config'
import { IModal } from '../components/Modal/interfaces'

@Service()
export default class State_Service {
    private _deckglViewSettings: IDeckglView_Settings = deckgl_Config.settings
    private _hexagonLayerProps: IHexagonLayer_ReactiveProps = hexagonLayer_Config.reactiveProps
    private _layerElements: ILayerElement[] = layerElements_Config
    private _layerVisibility: ILayerVisibility = layerVisibility_Config
    private _mapStyles: IMapStyle[] = mapbox_Config.styles
    private _mapboxSettings: IMapboxSettings = mapbox_Config.settings
    private _modal: IModal = modal_Config
    private _states: Record<string, string> = States

    constructor(
        private _logService: Log_Service,
        private _reactiveState: Record<string, ReactiveState>,
        private _staticState: Record<string, StaticState>
    ) {
        this._logService = Container.get(Log_Service)
        this.createReactiveState()
        this.createStaticState()
    }

    getReactiveState(state: string): ReactiveState {
        return cloneDeep(this._reactiveState[state])
    }

    setReactiveState(state: string, payload: ReactiveState): void {
        this.logReactiveState({ state, status: 'OLD' })
        this._reactiveState[state] = cloneDeep(payload)
        this.logReactiveState({ state, status: 'NEW' })
    }

    getStaticState(state: string): StaticState {
        return cloneDeep(this._staticState[state])
    }

    setStaticState(state: string, payload: StaticState): void {
        this.logStaticState({ state, status: 'OLD' })
        this._staticState[state] = cloneDeep(payload)
        this.logStaticState({ state, status: 'NEW' })
    }

    private createReactiveState(): void {
        const { HEXAGON_LAYER_PROPS, LAYER_ELEMENTS, MODAL } = this._states
        this._reactiveState = reactive({
            [HEXAGON_LAYER_PROPS]: this._hexagonLayerProps,
            [LAYER_ELEMENTS]: this._layerElements,
            [MODAL]: this._modal
        })
    }

    private createStaticState(): void {
        const { DECKGL_VIEW_SETTINGS, LAYER_VISIBILITY, MAP_STYLES, MAPBOX_SETTINGS } = this._states
        this._staticState = {
            [DECKGL_VIEW_SETTINGS]: this._deckglViewSettings,
            [LAYER_VISIBILITY]: this._layerVisibility,
            [MAP_STYLES]: this._mapStyles,
            [MAPBOX_SETTINGS]: this._mapboxSettings
        }
    }

    private logReactiveState({ state, status }: Record<string, string>): void {
        this._logService.consoleLog(`${state} ${status} state:`, this.getReactiveState(state))
    }

    private logStaticState({ state, status }: Record<string, string>): void {
        this._logService.consoleLog(`${state} ${status} state:`, this.getStaticState(state))
    }
}
