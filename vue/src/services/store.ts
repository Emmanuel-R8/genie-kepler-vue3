import { Service } from 'typedi'

import { LayerElements, States } from '@/enums'
import {
  IDeckglViewSettings,
  IHexagonLayerReactiveProps,
  ILayerElement,
  IMapStyle,
  IMapboxSettings,
  IModal,
  IStore,
  IStyleLayers
} from '@/interfaces'
import { store } from '@/store'

@Service()
export default class StoreService {
  private _layerElements: Record<string, string> = LayerElements
  private _states: Record<string, string> = States

  constructor(private _store: IStore) {
    this._store = store
  }

  getState(state: string): any {
    return this._store.getState(state)
  }

  setState(state: string, payload: any = {}): void {
    const {
      DECKGL_VIEW_SETTINGS,
      HEXAGON_LAYER_REACTIVE_PROPS,
      LAYER_ELEMENTS,
      MAP_STYLES,
      MAPBOX_SETTINGS,
      MODAL,
      STYLE_LAYERS
    } = this._states
    const setState = {
      [DECKGL_VIEW_SETTINGS]: this.setDeckglViewSettingsState,
      [HEXAGON_LAYER_REACTIVE_PROPS]: this.setHexagonLayerReactivePropsState,
      [LAYER_ELEMENTS]: this.setLayerElementsState,
      [MAP_STYLES]: this.setMapStylesState,
      [MAPBOX_SETTINGS]: this.setMapboxSettingsState,
      [MODAL]: this.setModalState,
      [STYLE_LAYERS]: this.setStyleLayersState
    }
    return setState[state](payload)
  }

  private setDeckglViewSettingsState = (settings: IDeckglViewSettings): void => {
    const { DECKGL_VIEW_SETTINGS } = this._states
    this._store.setState(DECKGL_VIEW_SETTINGS, settings)
  }

  private setHexagonLayerReactivePropsState = (props: IHexagonLayerReactiveProps): void => {
    const { HEXAGON_LAYER_REACTIVE_PROPS } = this._states
    this._store.setState(HEXAGON_LAYER_REACTIVE_PROPS, props)
  }

  private setLayerElementsState = ({ layerElement: id }: Record<string, string>): void => {
    const { LAYER_ELEMENTS } = this._states
    const layerElements: ILayerElement[] = this.getState(LAYER_ELEMENTS) as ILayerElement[]
    const layerElement = (layerElement: ILayerElement): boolean => layerElement.id === id
    const i = layerElements.findIndex(layerElement)
    layerElements[i].isActive = !layerElements[i].isActive
    this._store.setState(LAYER_ELEMENTS, layerElements)
  }

  private setMapStylesState = (): void => {
    const { MAP_STYLES } = this._states
    const mapStyles: IMapStyle[] = this.getState(MAP_STYLES) as IMapStyle[]
    for (const mapStyle of mapStyles) {
      mapStyle.isActive = !mapStyle.isActive
    }
    this._store.setState(MAP_STYLES, mapStyles)
  }

  private setMapboxSettingsState = (settings: IMapboxSettings): void => {
    const { MAPBOX_SETTINGS } = this._states
    this._store.setState(MAPBOX_SETTINGS, settings)
  }

  private setModalState = (): void => {
    const { MODAL } = this._states
    const modal: IModal = this.getState(MODAL) as IModal
    modal.isActive = !modal.isActive
    this._store.setState(MODAL, modal)
  }

  private setStyleLayersState = ({ layerElement: id }: Record<string, string>): void => {
    const { BIOSPHERE, BIOSPHERE_BORDER } = this._layerElements
    const { STYLE_LAYERS } = this._states
    const styleLayers = this.getState(STYLE_LAYERS) as IStyleLayers
    styleLayers[id as keyof IStyleLayers].isActive = !styleLayers[id as keyof IStyleLayers].isActive
    id === BIOSPHERE &&
      (styleLayers[BIOSPHERE_BORDER as keyof IStyleLayers].isActive =
        !styleLayers[BIOSPHERE_BORDER as keyof IStyleLayers].isActive)
    this._store.setState(STYLE_LAYERS, styleLayers)
  }
}
