import { Service } from 'typedi'

import {
  IDeckglSettings,
  IHexagonLayerReactiveProps,
  ILayerElement,
  ILayerElements,
  IMapboxSettings,
  IMapStyle,
  IModal,
  IStore,
  IStyleLayer
} from '@/interfaces'
import { store } from '@/store'

@Service()
export default class StoreService {
  private _store: IStore = store

  getDeckglViewState = (): IDeckglSettings => this._store.getters.getDeckglViewState()
  setDeckglViewState = (settings: IDeckglSettings): void =>
    this._store.setters.setDeckglViewState(settings)

  getHexagonLayerReactivePropsState = (): IHexagonLayerReactiveProps =>
    this._store.getters.getHexagonLayerReactivePropsState()
  setHexagonLayerReactivePropsState = (prop: string, value: number): void =>
    this._store.setters.setHexagonLayerReactivePropsState(prop, value)
  resetHexagonLayerReactivePropsState = (props: IHexagonLayerReactiveProps): void =>
    this._store.setters.resetHexagonLayerReactivePropsState(props)

  getLayerElementsState = (): ILayerElements[] => this._store.getters.getLayerElementsState()
  setLayerElementsState = (layerElement: ILayerElement): void =>
    this._store.setters.setLayerElementsState(layerElement)

  getMapboxSettingsState = (): IMapboxSettings => this._store.getters.getMapboxSettingsState()
  setMapboxSettingsState = (settings: IMapboxSettings): void =>
    this._store.setters.setMapboxSettingsState(settings)

  getMapStylesState = (): IMapStyle => this._store.getters.getMapStylesState()
  setMapStylesState = (): void => this._store.setters.setMapStylesState()

  getModalState = (): IModal => this._store.getters.getModalState()
  setModalState = (): void => this._store.setters.setModalState()

  getStyleLayersVisibilityState = (): IStyleLayer =>
    this._store.getters.getStyleLayersVisibilityState()
  setStyleLayersVisibilityState = (layerElement: ILayerElement): void =>
    this._store.setters.setStyleLayersVisibilityState(layerElement)
}
