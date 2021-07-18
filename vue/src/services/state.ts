import cloneDeep from 'lodash.clonedeep'
import { Container, Service } from 'typedi'
import { reactive } from 'vue'

import { deckgl, hexagonLayer, layerElements, layerVisibility, mapbox, modal } from '@/config'
import { States } from '@/enums'
import {
  IDeckglViewSettings,
  IHexagonLayerProps,
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
  private _hexagonLayerProps: IHexagonLayerProps = hexagonLayer.reactiveProps
  private _layerElements: ILayerElement[] = layerElements
  private _layerVisibility: ILayerVisibility = layerVisibility
  private _mapStyles: IMapStyle[] = mapbox.styles
  private _mapboxSettings: IMapboxSettings = mapbox.settings
  private _modal: IModal = modal
  private _states: Record<string, string> = States

  constructor(
    private _logService: LogService,
    private _reactiveState: Record<string, ReactiveState[]>,
    private _staticState: Record<string, StaticState[]>
  ) {
    this._logService = Container.get(LogService)
    this.createReactiveState()
    this.createStaticState()
  }

  getReactiveState(state: string): ReactiveState {
    return cloneDeep(this._reactiveState[state][this._reactiveState[state].length - 1])
  }

  setReactiveState(state: string, payload: ReactiveState): void {
    this.logReactiveState(state, 'OLD')
    this._reactiveState[state].push(cloneDeep(payload))
    this.logReactiveState(state, 'NEW')
  }

  getStaticState(state: string): StaticState {
    return cloneDeep(this._staticState[state][this._staticState[state].length - 1])
  }

  setStaticState(state: string, payload: StaticState): void {
    this.logStaticState(state, 'OLD')
    this._staticState[state].push(cloneDeep(payload))
    this.logStaticState(state, 'NEW')
  }

  private createReactiveState(): void {
    const { HEXAGON_LAYER_PROPS, LAYER_ELEMENTS, MODAL } = this._states
    this._reactiveState = reactive({
      [HEXAGON_LAYER_PROPS]: [this._hexagonLayerProps],
      [LAYER_ELEMENTS]: [this._layerElements],
      [MODAL]: [this._modal]
    })
  }

  private createStaticState(): void {
    const { DECKGL_VIEW_SETTINGS, LAYER_VISIBILITY, MAP_STYLES, MAPBOX_SETTINGS } = this._states
    this._staticState = {
      [DECKGL_VIEW_SETTINGS]: [this._deckglViewSettings],
      [LAYER_VISIBILITY]: [this._layerVisibility],
      [MAP_STYLES]: [this._mapStyles],
      [MAPBOX_SETTINGS]: [this._mapboxSettings]
    }
  }

  private logReactiveState(state: string, status: string): void {
    this._logService.consoleLog(`${state} ${status} state:`, this.getReactiveState(state))
  }

  private logStaticState(state: string, status: string): void {
    this._logService.consoleLog(`${state} ${status} state:`, this.getStaticState(state))
  }
}
