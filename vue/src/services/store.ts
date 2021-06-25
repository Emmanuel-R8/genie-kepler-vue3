import cloneDeep from 'lodash.clonedeep'
import { Container, Service } from 'typedi'
import { reactive } from 'vue'

import { deckgl, hexagonLayer, layerElements, mapbox, modal, styleLayers } from '@/config'
import { States } from '@/enums'
import {
  IDeckglViewSettings,
  IHexagonLayerReactiveProps,
  ILayerElement,
  IMapStyle,
  IMapboxSettings,
  IModal,
  IStyleLayers
} from '@/interfaces'
import { LogService } from '@/services'

@Service()
export default class StoreService {
  private _deckglViewSettings: IDeckglViewSettings = deckgl.settings
  private _hexagonLayerReactiveProps: IHexagonLayerReactiveProps = hexagonLayer.reactiveProps
  private _layerElements: ILayerElement[] = layerElements
  private _mapStyles: IMapStyle[] = mapbox.styles
  private _mapboxSettings: IMapboxSettings = mapbox.settings
  private _modal: IModal = modal
  private _styleLayers: IStyleLayers = styleLayers
  private _states: Record<string, string> = States

  constructor(private _logService: LogService, private _state: Record<string, any>) {
    this._logService = Container.get(LogService)
    this.createState()
  }

  createState(): void {
    const {
      DECKGL_VIEW_SETTINGS,
      HEXAGON_LAYER_REACTIVE_PROPS,
      LAYER_ELEMENTS,
      MAP_STYLES,
      MAPBOX_SETTINGS,
      MODAL,
      STYLE_LAYERS
    } = this._states
    this._state = reactive({
      [DECKGL_VIEW_SETTINGS]: this._deckglViewSettings,
      [HEXAGON_LAYER_REACTIVE_PROPS]: this._hexagonLayerReactiveProps,
      [LAYER_ELEMENTS]: this._layerElements,
      [MAP_STYLES]: this._mapStyles,
      [MAPBOX_SETTINGS]: this._mapboxSettings,
      [MODAL]: this._modal,
      [STYLE_LAYERS]: this._styleLayers
    })
  }

  getState(state: string): Record<string, any> {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
    return cloneDeep(this._state[state])
  }

  setState(state: string, payload: Record<string, any>): void {
    // this.logState(state, 'OLD')
    this._state[state] = cloneDeep(payload)
    // this.logState(state, 'NEW')
  }

  // logState(state: string, status: string): void {
  //   this._logService.printConsoleLog(`${state} ${status} state:`, this.getState(state))
  // }
}
