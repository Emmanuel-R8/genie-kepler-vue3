import { Service } from 'typedi'

import { ActiveState, LayerElements, StoreStates } from '@/enums'
import {
  IDeckglViewSettings,
  IHexagonLayerReactiveProps,
  IMapStyle,
  IMapboxSettings,
  IModal,
  IStore,
  IStyleLayer
} from '@/interfaces'
import { store } from '@/store'

@Service()
export default class StoreService {
  private _DECKGL_VIEW_SETTINGS: string = StoreStates.DECKGL_VIEW_SETTINGS
  private _HEXAGON_LAYER_REACTIVE_PROPS: string = StoreStates.HEXAGON_LAYER_REACTIVE_PROPS
  private _LAYER_ELEMENTS: string = StoreStates.LAYER_ELEMENTS
  private _MAP_STYLES: string = StoreStates.MAP_STYLES
  private _MAPBOX_SETTINGS: string = StoreStates.MAPBOX_SETTINGS
  private _MODAL: string = StoreStates.MODAL
  private _STYLE_LAYERS_VISIBILITY: string = StoreStates.STYLE_LAYERS_VISIBILITY
  private _activeState: Record<string, any> = ActiveState
  private _layerElements: Record<string, any> = LayerElements
  private _store: IStore = store

  getState = (state: string): any => this._store.getState(state)

  setState = (state: string, payload?: Record<string, any> | undefined): any => {
    const setDeckglViewSettingsState = (settings: IDeckglViewSettings): void =>
      this._store.setState(this._DECKGL_VIEW_SETTINGS, settings)

    const setHexagonLayerReactivePropsState = (payload: any): void => {
      if ('id' in payload && 'value' in payload) {
        const { id, value } = payload
        const props: IHexagonLayerReactiveProps = this.getState(this._HEXAGON_LAYER_REACTIVE_PROPS)
        props[id as keyof IHexagonLayerReactiveProps] = +value
        payload = { ...props }
      }
      this._store.setState(this._HEXAGON_LAYER_REACTIVE_PROPS, payload)
    }

    const setLayerElementsState = (layerElement: any): void => {
      const layerElements: any = this.getState(this._LAYER_ELEMENTS)
      layerElements[layerElement].active = !layerElements[layerElement].active
      this._store.setState(this._LAYER_ELEMENTS, layerElements)
    }

    const setMapStylesState = (): void => {
      let id: string
      const mapStyles: IMapStyle = this.getState(this._MAP_STYLES)
      const { active, outdoors, satellite } = mapStyles
      mapStyles[active as keyof IMapStyle].visible = !mapStyles[active as keyof IMapStyle].visible
      mapStyles[active as keyof IMapStyle].id === outdoors.id
        ? (id = satellite.id)
        : (id = outdoors.id)
      mapStyles.active = id
      mapStyles[id as keyof IMapStyle].visible = !mapStyles[id as keyof IMapStyle].visible
      this._store.setState(this._MAP_STYLES, mapStyles)
    }

    const setMapboxSettingsState = (settings: IMapboxSettings): void =>
      this._store.setState(this._MAPBOX_SETTINGS, settings)

    const setModalState = (): void => {
      const { ACTIVE, INACTIVE } = this._activeState
      const modal: IModal = this.getState(this._MODAL)
      modal.active = !modal.active
      modal.active ? (modal.class = ACTIVE) : (modal.class = INACTIVE)
      this._store.setState(this._MODAL, modal)
    }

    const setStyleLayersVisibilityState = (styleLayer: IStyleLayer): void => {
      const { BIOSPHERE, BIOSPHERE_BORDER } = this._layerElements
      const styleLayers: IStyleLayer = this.getState(this._STYLE_LAYERS_VISIBILITY)
      styleLayers[styleLayer as keyof IStyleLayer].visible =
        !styleLayers[styleLayer as keyof IStyleLayer].visible
      styleLayer === BIOSPHERE &&
        (styleLayers[BIOSPHERE_BORDER as keyof IStyleLayer].visible =
          !styleLayers[BIOSPHERE_BORDER as keyof IStyleLayer].visible)
      this._store.setState(this._STYLE_LAYERS_VISIBILITY, styleLayers)
    }

    const setState: Record<string, any> = {
      [this._DECKGL_VIEW_SETTINGS]: payload && setDeckglViewSettingsState,
      [this._HEXAGON_LAYER_REACTIVE_PROPS]: payload && setHexagonLayerReactivePropsState,
      [this._LAYER_ELEMENTS]: payload && setLayerElementsState,
      [this._MAP_STYLES]: setMapStylesState,
      [this._MAPBOX_SETTINGS]: payload && setMapboxSettingsState,
      [this._MODAL]: setModalState,
      [this._STYLE_LAYERS_VISIBILITY]: payload && setStyleLayersVisibilityState
    }
    return setState[state](payload)
  }
}
