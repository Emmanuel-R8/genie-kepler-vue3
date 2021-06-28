import cloneDeep from 'lodash.clonedeep'
import { Container, Service } from 'typedi'
import { reactive } from 'vue'

import { deckgl, hexagonLayer, layerElements, layers, mapbox, modal } from '@/config'
import { States } from '@/enums'
import {
  IDeckglViewSettings,
  IHexagonLayerReactiveProps,
  ILayerElement,
  ILayers,
  IMapStyle,
  IMapboxSettings,
  IModal
} from '@/interfaces'
import { LogService } from '@/services'
import { State } from '@/types'

@Service()
export default class StoreService {
  private _deckglViewSettings: IDeckglViewSettings = deckgl.settings
  private _hexagonLayerReactiveProps: IHexagonLayerReactiveProps = hexagonLayer.reactiveProps
  private _layerElements: ILayerElement[] = layerElements
  private _layers: ILayers = layers
  private _mapStyles: IMapStyle[] = mapbox.styles
  private _mapboxSettings: IMapboxSettings = mapbox.settings
  private _modal: IModal = modal
  private _states: Record<string, string> = States

  constructor(private _logService: LogService, private _state: Record<string, State>) {
    this._logService = Container.get(LogService)
    this.createState()
  }

  createState(): void {
    const {
      DECKGL_VIEW_SETTINGS,
      HEXAGON_LAYER_REACTIVE_PROPS,
      LAYER_ELEMENTS,
      LAYERS,
      MAP_STYLES,
      MAPBOX_SETTINGS,
      MODAL
    } = this._states
    this._state = reactive({
      [DECKGL_VIEW_SETTINGS]: this._deckglViewSettings,
      [HEXAGON_LAYER_REACTIVE_PROPS]: this._hexagonLayerReactiveProps,
      [LAYER_ELEMENTS]: this._layerElements,
      [LAYERS]: this._layers,
      [MAP_STYLES]: this._mapStyles,
      [MAPBOX_SETTINGS]: this._mapboxSettings,
      [MODAL]: this._modal
    })
  }

  getState(state: string): State {
    return cloneDeep(this._state[state])
  }

  setState(state: string, payload: State): void {
    // this.logState(state, 'OLD')
    this._state[state] = cloneDeep(payload)
    // this.logState(state, 'NEW')
  }

  // logState(state: string, status: string): void {
  //   this._logService.printConsoleLog(`${state} ${status} state:`, this.getState(state))
  // }
}
