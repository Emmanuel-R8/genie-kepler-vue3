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
  IStyleLayer
} from '@/interfaces'
import { store } from '@/store'

@Service()
export default class StoreService {
  private _DECKGL_VIEW_SETTINGS: string = States.DECKGL_VIEW_SETTINGS
  private _HEXAGON_LAYER_REACTIVE_PROPS: string = States.HEXAGON_LAYER_REACTIVE_PROPS
  private _LAYER_ELEMENTS: string = States.LAYER_ELEMENTS
  private _MAP_STYLES: string = States.MAP_STYLES
  private _MAPBOX_SETTINGS: string = States.MAPBOX_SETTINGS
  private _MODAL: string = States.MODAL
  private _STYLE_LAYERS: string = States.STYLE_LAYERS
  private _layerElements: Record<string, any> = LayerElements
  private _store: IStore = store

  getState(state: string): any {
    return this._store.getState(state)
  }

  setState(state: string, payload: Record<string, any> = {}): void {
    const setState: Record<string, any> = {
      [this._DECKGL_VIEW_SETTINGS]: payload && this.setDeckglViewSettingsState,
      [this._HEXAGON_LAYER_REACTIVE_PROPS]: payload && this.setHexagonLayerReactivePropsState,
      [this._LAYER_ELEMENTS]: payload && this.setLayerElementsState,
      [this._MAP_STYLES]: this.setMapStylesState,
      [this._MAPBOX_SETTINGS]: payload && this.setMapboxSettingsState,
      [this._MODAL]: this.setModalState,
      [this._STYLE_LAYERS]: payload && this.setStyleLayersState
    }
    setState[state](payload)
  }

  private setDeckglViewSettingsState = (settings: IDeckglViewSettings): void =>
    this._store.setState(this._DECKGL_VIEW_SETTINGS, settings)

  private setHexagonLayerReactivePropsState = (payload: Record<string, any>): void => {
    if ('prop' in payload && 'value' in payload) {
      const { prop, value } = payload
      const props: IHexagonLayerReactiveProps = this.getState(this._HEXAGON_LAYER_REACTIVE_PROPS)
      props[prop as keyof IHexagonLayerReactiveProps] = +value
      payload = { ...props }
    }
    this._store.setState(this._HEXAGON_LAYER_REACTIVE_PROPS, payload)
  }

  private setLayerElementsState = ({ layerElement: id }: Record<string, string>): void => {
    const layerElements: ILayerElement[] = this.getState(this._LAYER_ELEMENTS)
    const layerElement = (layerElement: ILayerElement): boolean => layerElement.id === id
    const i = layerElements.findIndex(layerElement)
    layerElements[i].isActive = !layerElements[i].isActive
    this._store.setState(this._LAYER_ELEMENTS, layerElements)
  }

  private setMapStylesState = (): void => {
    let id: string
    const mapStyles: IMapStyle = this.getState(this._MAP_STYLES)
    const { active, outdoors, satellite } = mapStyles
    mapStyles[active as keyof IMapStyle].isActive = !mapStyles[active as keyof IMapStyle].isActive
    mapStyles[active as keyof IMapStyle].id === outdoors.id
      ? (id = satellite.id)
      : (id = outdoors.id)
    mapStyles.active = id
    mapStyles[id as keyof IMapStyle].isActive = !mapStyles[id as keyof IMapStyle].isActive
    this._store.setState(this._MAP_STYLES, mapStyles)
  }

  private setMapboxSettingsState = (settings: IMapboxSettings): void =>
    this._store.setState(this._MAPBOX_SETTINGS, settings)

  private setModalState = (): void => {
    const modal: IModal = this.getState(this._MODAL)
    modal.isActive = !modal.isActive
    this._store.setState(this._MODAL, modal)
  }

  private setStyleLayersState = ({ layerElement: id }: Record<string, string>): void => {
    const { BIOSPHERE, BIOSPHERE_BORDER } = this._layerElements
    const styleLayers: IStyleLayer = this.getState(this._STYLE_LAYERS)
    styleLayers[id as keyof IStyleLayer].isActive = !styleLayers[id as keyof IStyleLayer].isActive
    id === BIOSPHERE &&
      (styleLayers[BIOSPHERE_BORDER as keyof IStyleLayer].isActive =
        !styleLayers[BIOSPHERE_BORDER as keyof IStyleLayer].isActive)
    this._store.setState(this._STYLE_LAYERS, styleLayers)
  }
}
