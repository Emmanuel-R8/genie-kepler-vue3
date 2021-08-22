import { Container, Service } from 'typedi'
import { reactive } from 'vue'
import cloneDeep from 'lodash.clonedeep'

import { States } from '@/enums'
import { LogService } from '@/services'
import { ReactiveState, StaticState } from '@/types'
import {
    deckglConfig,
    hexagonLayerConfig,
    layerElementsConfig,
    layerVisibilityConfig,
    mapboxConfig,
    modalConfig
} from '@/config'
import {
    IDeckglViewSettings,
    IHexagonLayerProps,
    ILayerElement,
    ILayerVisibility,
    IMapStyle,
    IMapboxSettings,
    IModal
} from '@/interfaces'

@Service()
export default class StateService {
    private _deckglViewSettings: IDeckglViewSettings = deckglConfig.settings
    private _hexagonLayerProps: IHexagonLayerProps = hexagonLayerConfig.reactiveProps
    private _layerElements: ILayerElement[] = layerElementsConfig
    private _layerVisibility: ILayerVisibility = layerVisibilityConfig
    private _mapStyles: IMapStyle[] = mapboxConfig.styles
    private _mapboxSettings: IMapboxSettings = mapboxConfig.settings
    private _modal: IModal = modalConfig
    private _states: Record<string, string> = States

    constructor(
        private _logService: LogService,
        private _reactiveState: Record<string, ReactiveState>,
        private _staticState: Record<string, StaticState>
    ) {
        this._logService = Container.get(LogService)
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
