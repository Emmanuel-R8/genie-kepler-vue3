import { Service } from 'typedi'

import {
  IDeckglSettings,
  IHexagonLayerDynamicProps,
  ILayer,
  ILayerElement,
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

  getHexagonLayerPropsState = (): IHexagonLayerDynamicProps =>
    this._store.getters.getHexagonLayerPropsState()
  setHexagonLayerPropsState = (prop: string, value: number): void =>
    this._store.setters.setHexagonLayerPropsState(prop, value)
  resetHexagonLayerPropsState = (props: IHexagonLayerDynamicProps): void =>
    this._store.setters.resetHexagonLayerPropsState(props)

  getLayerElementsState = (): ILayerElement[] => this._store.getters.getLayerElementsState()
  setLayerElementsState = (layer: ILayer): void => this._store.setters.setLayerElementsState(layer)

  getMapboxSettingsState = (): IMapboxSettings => this._store.getters.getMapboxSettingsState()
  setMapboxSettingsState = (settings: IMapboxSettings): void =>
    this._store.setters.setMapboxSettingsState(settings)

  getMapStylesState = (): IMapStyle => this._store.getters.getMapStylesState()
  setMapStylesState = (): void => this._store.setters.setMapStylesState()

  getModalState = (): IModal => this._store.getters.getModalState()
  setModalState = (): void => this._store.setters.setModalState()

  getStyleLayersVisibilityState = (): IStyleLayer =>
    this._store.getters.getStyleLayersVisibilityState()
  setStyleLayersVisibilityState = (layer: ILayer): void =>
    this._store.setters.setStyleLayersVisibilityState(layer)
}
