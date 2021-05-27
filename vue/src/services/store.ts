import { Service } from 'typedi'

import { ActiveState, LayerElements, StoreStates } from '@/enums'
import {
  IDeckglViewSettings,
  IHexagonLayerReactiveProps,
  ILayerElement,
  ILayerElements,
  IMapStyle,
  IMapboxSettings,
  IModal,
  IStore,
  IStyleLayer
} from '@/interfaces'
import { store } from '@/store'

@Service()
export default class StoreService {
  private _DECKGL_VIEW_SETTINGS = StoreStates.DECKGL_VIEW_SETTINGS
  private _HEXAGON_LAYER_REACTIVE_PROPS = StoreStates.HEXAGON_LAYER_REACTIVE_PROPS
  private _LAYER_ELEMENTS = StoreStates.LAYER_ELEMENTS
  private _MAP_STYLES = StoreStates.MAP_STYLES
  private _MAPBOX_SETTINGS = StoreStates.MAPBOX_SETTINGS
  private _MODAL = StoreStates.MODAL
  private _STYLE_LAYERS_VISIBILITY = StoreStates.STYLE_LAYERS_VISIBILITY
  private _activeState = ActiveState
  private _layerElements = LayerElements
  private _store: IStore = store

  getDeckglViewSettingsState = (): IDeckglViewSettings =>
    this._store.getState(this._DECKGL_VIEW_SETTINGS)
  setDeckglViewSettingsState = (settings: IDeckglViewSettings): void =>
    this._store.setState(this._DECKGL_VIEW_SETTINGS, settings)

  getHexagonLayerReactivePropsState = (): IHexagonLayerReactiveProps =>
    this._store.getState(this._HEXAGON_LAYER_REACTIVE_PROPS)
  setHexagonLayerReactivePropsState = ({ id: prop, value }: Record<string, string>): void => {
    const props: IHexagonLayerReactiveProps = this.getHexagonLayerReactivePropsState()
    props[prop as keyof IHexagonLayerReactiveProps] = +value
    this._store.setState(this._HEXAGON_LAYER_REACTIVE_PROPS, props)
  }
  resetHexagonLayerReactivePropsState = (props: IHexagonLayerReactiveProps): void =>
    this._store.setState(this._HEXAGON_LAYER_REACTIVE_PROPS, props)

  getLayerElementsState = (): ILayerElements => this._store.getState(this._LAYER_ELEMENTS)
  setLayerElementsState = (layerElement: ILayerElement): void => {
    const layerElements: any = this.getLayerElementsState()
    layerElements[layerElement as keyof ILayerElement].active =
      !layerElements[layerElement as keyof ILayerElement].active
    this._store.setState(this._LAYER_ELEMENTS, layerElements)
  }

  getMapStylesState = (): IMapStyle => this._store.getState(this._MAP_STYLES)
  setMapStylesState = (): void => {
    let id: string
    const mapStyles: IMapStyle = this.getMapStylesState()
    mapStyles[mapStyles.active as keyof IMapStyle].visible =
      !mapStyles[mapStyles.active as keyof IMapStyle].visible
    mapStyles[mapStyles.active as keyof IMapStyle].id === mapStyles.outdoors.id
      ? (id = mapStyles.satellite.id)
      : (id = mapStyles.outdoors.id)
    mapStyles.active = id
    mapStyles[id as keyof IMapStyle].visible = !mapStyles[id as keyof IMapStyle].visible
    this._store.setState(this._MAP_STYLES, mapStyles)
  }

  getMapboxSettingsState = (): IMapboxSettings => this._store.getState(this._MAPBOX_SETTINGS)
  setMapboxSettingsState = (settings: IMapboxSettings): void =>
    this._store.setState(this._MAPBOX_SETTINGS, settings)

  getModalState = (): IModal => this._store.getState(this._MODAL)
  setModalState = (): void => {
    const { ACTIVE, INACTIVE } = this._activeState
    const modal: IModal = this.getModalState()
    modal.active = !modal.active
    modal.active ? (modal.class = ACTIVE) : (modal.class = INACTIVE)
    this._store.setState(this._MODAL, modal)
  }

  getStyleLayersVisibilityState = (): IStyleLayer =>
    this._store.getState(this._STYLE_LAYERS_VISIBILITY)
  setStyleLayersVisibilityState = (layerElement: ILayerElement): void => {
    const { BIOSPHERE, BIOSPHERE_BORDER } = this._layerElements
    const styleLayers: IStyleLayer = this.getStyleLayersVisibilityState()
    styleLayers[layerElement as keyof IStyleLayer].visible =
      !styleLayers[layerElement as keyof IStyleLayer].visible
    layerElement === BIOSPHERE &&
      (styleLayers[BIOSPHERE_BORDER].visible = !styleLayers[BIOSPHERE_BORDER].visible)
    this._store.setState(this._STYLE_LAYERS_VISIBILITY, styleLayers)
  }
}
