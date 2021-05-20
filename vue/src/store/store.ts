import { reactive, readonly } from 'vue'

import { State } from '@/enums'
import { deckgl, hexagonLayer, layerElements, mapbox, modal, styleLayersVisibility } from '@/config'
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

const {
  DECKGL_SETTINGS,
  HEXAGON_LAYER_PROPS,
  LAYER_ELEMENTS,
  MAPBOX_SETTINGS,
  MAP_STYLES,
  MODAL,
  STYLE_LAYERS_VISIBILITY
} = State
const { settings: deckglSettings } = deckgl
const { dynamicProps: hexagonLayerProps } = hexagonLayer
const { settings: mapboxSettings, styles: mapStyles } = mapbox
const state: Record<string, any> = reactive({
  deckglSettings,
  hexagonLayerProps,
  layerElements,
  mapboxSettings,
  mapStyles,
  modal,
  styleLayersVisibility
})

const getState = (key: string): any => {
  return state[key]
}
const setState = (key: string, value: Record<string, any>): void => {
  state[key] = value
}
/* state debugging tool
const logState = (state: string, key: string, value?: Record<string, any>): void => {
  state === 'old'
    ? console.log(`${key} ${state} state:`, value)
    : console.log(`${key} ${state} state:`, getState(key))
}
*/
const getters: Record<string, any> = {
  getDeckglViewState: (): void => getState(DECKGL_SETTINGS),
  getHexagonLayerPropsState: (): void => getState(HEXAGON_LAYER_PROPS),
  getLayerElementsState: (): void => getState(LAYER_ELEMENTS),
  getMapboxSettingsState: (): void => getState(MAPBOX_SETTINGS),
  getMapStylesState: (): void => getState(MAP_STYLES),
  getModalState: (): void => getState(MODAL),
  getStyleLayersVisibilityState: (): void => getState(STYLE_LAYERS_VISIBILITY)
}
const setters: Record<string, any> = {
  setDeckglViewState(settings: IDeckglSettings): void {
    const key: string = DECKGL_SETTINGS
    let deckglSettings: IDeckglSettings = { ...getState(key) }
    // logState('old', key, deckglSettings)
    deckglSettings = { ...settings }
    setState(key, deckglSettings)
    // logState('new', key)
  },
  setHexagonLayerPropsState(prop: string, value: number): void {
    const key: string = HEXAGON_LAYER_PROPS
    const dynamicProps: IHexagonLayerDynamicProps = { ...getState(key) }
    // logState('old', key, dynamicProps)
    dynamicProps[prop as keyof IHexagonLayerDynamicProps] = value
    setState(key, dynamicProps)
    // logState('new', key)
  },
  resetHexagonLayerPropsState(props: IHexagonLayerDynamicProps): void {
    const key: string = HEXAGON_LAYER_PROPS
    let dynamicProps: IHexagonLayerDynamicProps = { ...getState(key) }
    // logState('old', key, dynamicProps)
    dynamicProps = { ...props }
    setState(key, dynamicProps)
    // logState('new', key)
  },
  setLayerElementsState(id: ILayer): void {
    const key: string = LAYER_ELEMENTS
    const layerElements: ILayerElement[] = [...getState(key)]
    // logState('old', key, layerElements)
    const i: number = layerElements.findIndex((el: ILayerElement) => el.id === id)
    layerElements[i].active = !layerElements[i].active
    setState(key, layerElements)
    // logState('new', key)
  },
  setMapboxSettingsState(settings: IMapboxSettings): void {
    const key: string = MAPBOX_SETTINGS
    let mapboxSettings: IMapboxSettings = { ...getState(key) }
    // logState('old', key, mapboxSettings)
    mapboxSettings = { ...settings }
    setState(key, mapboxSettings)
    // logState('new', key)
  },
  setMapStylesState(): void {
    let id: string
    const key: string = MAP_STYLES
    const mapStyles: IMapStyle = { ...getState(key) }
    // logState('old', key, mapStyles)
    mapStyles[mapStyles.active as keyof IMapStyle].visible =
      !mapStyles[mapStyles.active as keyof IMapStyle].visible
    mapStyles[mapStyles.active as keyof IMapStyle].id === mapStyles.outdoors.id
      ? (id = mapStyles.satellite.id)
      : (id = mapStyles.outdoors.id)
    mapStyles.active = id
    mapStyles[id as keyof IMapStyle].visible = !mapStyles[id as keyof IMapStyle].visible
    setState(key, mapStyles)
    // logState('new', key)
  },
  setModalState(): void {
    const key: string = MODAL
    const modal: IModal = { ...getState(key) }
    // logState('old', key, modal)
    modal.active = !modal.active
    modal.active ? (modal.class = 'active') : (modal.class = 'inactive')
    setState(key, modal)
    // logState('new', key)
  },
  setStyleLayersVisibilityState(id: ILayer): void {
    const key: string = STYLE_LAYERS_VISIBILITY
    const styleLayers: IStyleLayer = { ...getState(key) }
    // logState('old', key, styleLayers)
    styleLayers[id as keyof IStyleLayer].visible = !styleLayers[id as keyof IStyleLayer].visible
    if (id === 'biosphere') {
      styleLayers['biosphere-border'].visible = !styleLayers['biosphere-border'].visible
    }
    setState(key, styleLayers)
    // logState('new', key)
  }
}
const store: IStore = {
  state: readonly(state),
  getters,
  setters
}
export default store
