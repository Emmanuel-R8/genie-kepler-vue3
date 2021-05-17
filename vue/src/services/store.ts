import { Service } from 'typedi'

import {
  IHexagonAttributes,
  IHexagonSettings,
  ILayer,
  ILayerElement,
  IMapSettings,
  IMapStyle,
  IModal,
  IStore,
  IStyleLayer
} from '@/interfaces'
import { store } from '@/store'

@Service()
export default class StoreService {
  private _store: IStore = store

  getHexagonAttributesState = (): IHexagonAttributes =>
    this._store.getters.getHexagonAttributesState()
  setHexagonAttributesState = (attribute: string, value: number): void =>
    this._store.setters.setHexagonAttributesState(attribute, value)

  getHexagonSettingsState = (): IHexagonSettings => this._store.getters.getHexagonSettingsState()
  setHexagonSettingsState = (settings: IHexagonSettings): void =>
    this._store.setters.setHexagonSettingsState(settings)

  getLayerElementsState = (): ILayerElement[] => this._store.getters.getLayerElementsState()
  setLayerElementsState = (layer: ILayer): void => this._store.setters.setLayerElementsState(layer)

  getMapSettingsState = (): IMapSettings => this._store.getters.getMapSettingsState()
  setMapSettingsState = (settings: IMapSettings): void =>
    this._store.setters.setMapSettingsState(settings)

  getMapStylesState = (): IMapStyle => this._store.getters.getMapStylesState()
  setMapStylesState = (): void => this._store.setters.setMapStylesState()

  getModalState = (): IModal => this._store.getters.getModalState()
  setModalState = (): void => this._store.setters.setModalState()

  getStyleLayersVisibilityState = (): IStyleLayer =>
    this._store.getters.getStyleLayersVisibilityState()
  setStyleLayersVisibilityState = (layer: ILayer): void =>
    this._store.setters.setStyleLayersVisibilityState(layer)
}
