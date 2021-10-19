import cloneDeep from 'lodash.clonedeep'
import { Container, Service } from 'typedi'
import { reactive } from 'vue'

import { deckgl, hexagonLayer, layerElements, layerVisibility, mapbox, modal } from '@/config'
import { LogStates, LogStatus, ReactiveStates, StaticStates } from '@/enums'
import {
  IDeckglViewSettings,
  IHexagonLayerReactiveProps,
  ILayerElement,
  ILayerVisibility,
  IMapStyle,
  IMapboxSettings,
  IModal
} from '@/interfaces'
import { LogService } from '@/services'
import { ReactiveState, StaticState } from '@/types'

@Service()
export default class StateService {
  private _deckglViewSettings: IDeckglViewSettings = deckgl.settings
  private _hexagonLayerReactiveProps: IHexagonLayerReactiveProps = hexagonLayer.reactiveProps
  private _layerElements: ILayerElement[] = layerElements
  private _layerVisibility: ILayerVisibility = layerVisibility
  private _logStates: Record<string, string> = LogStates
  private _logStatus: Record<string, string> = LogStatus
  private _mapStyles: IMapStyle[] = mapbox.styles
  private _mapboxSettings: IMapboxSettings = mapbox.settings
  private _modal: IModal = modal
  private _reactiveStates: Record<string, string> = ReactiveStates
  private _staticStates: Record<string, string> = StaticStates

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
    const { REACTIVE } = this._logStates
    const { NEW, OLD } = this._logStatus
    this.logState({ logState: REACTIVE, state, status: OLD })
    this._reactiveState[state] = cloneDeep(payload)
    this.logState({ logState: REACTIVE, state, status: NEW })
  }

  getStaticState(state: string): StaticState {
    return cloneDeep(this._staticState[state])
  }

  setStaticState(state: string, payload: StaticState): void {
    const { STATIC } = this._logStates
    const { NEW, OLD } = this._logStatus
    this.logState({ logState: STATIC, state, status: OLD })
    this._staticState[state] = cloneDeep(payload)
    this.logState({ logState: STATIC, state, status: NEW })
  }

  private createReactiveState(): void {
    const { HEXAGON_LAYER_REACTIVE_PROPS, LAYER_ELEMENTS, MODAL } = this._reactiveStates
    this._reactiveState = reactive({
      [HEXAGON_LAYER_REACTIVE_PROPS]: this._hexagonLayerReactiveProps,
      [LAYER_ELEMENTS]: this._layerElements,
      [MODAL]: this._modal
    })
  }

  private createStaticState(): void {
    const { DECKGL_VIEW_SETTINGS, LAYER_VISIBILITY, MAP_STYLES, MAPBOX_SETTINGS } = this._staticStates
    this._staticState = {
      [DECKGL_VIEW_SETTINGS]: this._deckglViewSettings,
      [LAYER_VISIBILITY]: this._layerVisibility,
      [MAP_STYLES]: this._mapStyles,
      [MAPBOX_SETTINGS]: this._mapboxSettings
    }
  }

  private logState({ logState, state, status }: Record<string, string>): void {
    const { REACTIVE } = this._logStates
    const message = `${state} ${status} state:`
    this._logService.consoleLog(
      message,
      logState === REACTIVE ? this.getReactiveState(state) : this.getStaticState(state)
    )
  }
}
