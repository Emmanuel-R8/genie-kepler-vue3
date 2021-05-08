// import cloneDeep from 'lodash/cloneDeep'
import { reactive, readonly } from 'vue'

import { State } from '@/enums'
import { layerElements, mapSettings, mapStyles, modal, styleLayersVisibility } from '@/config'
import { ILayerElement, IMapSetting, IMapStyle, IModal, IStore, IStyleLayer } from '@/interfaces'

const { settings } = mapSettings
const state: Record<string, any> = reactive({
  layerElements,
  mapSettings: settings,
  mapStyles,
  modal,
  styleLayers: styleLayersVisibility
})
const getState = (key: string) => {
  return state[key]
}
const setState = (key: string, value: Record<string, any>) => {
  state[key] = value
}
/* debugging tool
const logState = (state: string, key: string, value?: Record<string, any>): void => {
  state === 'old'
    ? console.log(`${key} ${state} state:`, cloneDeep(value))
    : console.log(`${key} ${state} state:`, cloneDeep(getState(key)))
}
*/
const getters: Record<string, any> = {
  getLayerElementsState: (): void => getState(State.LAYER_ELEMENTS),
  getMapSettingsState: (): void => getState(State.MAP_SETTINGS),
  getMapStylesState: (): void => getState(State.MAP_STYLES),
  getModalState: (): void => getState(State.MODAL),
  getStyleLayersVisibilityState: (): void => getState(State.STYLE_LAYERS)
}
const setters: Record<string, any> = {
  setLayerElementsState(id: string): void {
    const key: string = State.LAYER_ELEMENTS
    const layerElements: ILayerElement[] = [...getState(key)]
    // logState('old', key, layerElements)
    const i: number = layerElements.findIndex((el: ILayerElement) => el.id === id)
    layerElements[i].active = !layerElements[i].active
    setState(key, layerElements)
    // logState('new', key)
  },
  setMapSettingsState(settings: IMapSetting): void {
    const key: string = State.MAP_SETTINGS
    let mapSettings: IMapSetting = { ...getState(key) }
    // logState('old', key, mapSettings)
    mapSettings = settings
    setState(key, mapSettings)
    // logState('new', key)
  },
  setMapStylesState(): void {
    let id: string
    const key: string = State.MAP_STYLES
    const mapStyles: IMapStyle = { ...getState(key) }
    // logState('old', key, mapStyles)
    mapStyles[mapStyles.active as keyof IMapStyle].visible = !mapStyles[
      mapStyles.active as keyof IMapStyle
    ].visible
    mapStyles[mapStyles.active as keyof IMapStyle].id === mapStyles.outdoors.id
      ? (id = mapStyles.satellite.id)
      : (id = mapStyles.outdoors.id)
    mapStyles.active = id
    mapStyles[id as keyof IMapStyle].visible = !mapStyles[id as keyof IMapStyle].visible
    setState(key, mapStyles)
    // logState('new', key)
  },
  setModalState(): void {
    const key: string = State.MODAL
    const modal: IModal = { ...getState(key) }
    // logState('old', key, modal)
    modal.show = !modal.show
    modal.show ? (modal.class = 'active') : (modal.class = 'inactive')
    setState(key, modal)
    // logState('new', key)
  },
  setStyleLayersVisibilityState(id: string): void {
    const key: string = State.STYLE_LAYERS
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
