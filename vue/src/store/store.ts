import cloneDeep from 'lodash/cloneDeep'
import { reactive, readonly } from 'vue'

import { States } from '@/enums'
// import { States, StateStatus } from '@/enums'
import { deckgl, hexagonLayer, layerElements, mapbox, modal, styleLayersVisibility } from '@/config'
import { IStore } from '@/interfaces'

const {
  DECKGL_VIEW_SETTINGS,
  HEXAGON_LAYER_REACTIVE_PROPS,
  LAYER_ELEMENTS,
  MAP_STYLES,
  MAPBOX_SETTINGS,
  MODAL,
  STYLE_LAYERS
} = States
// const { NEW, OLD } = StateStatus
const { settings: deckglViewSettings } = deckgl
const { settings: mapboxSettings, styles: mapStyles } = mapbox
const { reactiveProps: hexagonLayerReactiveProps } = hexagonLayer

const state: Record<string, any> = reactive({
  [DECKGL_VIEW_SETTINGS]: cloneDeep(deckglViewSettings),
  [HEXAGON_LAYER_REACTIVE_PROPS]: cloneDeep(hexagonLayerReactiveProps),
  [LAYER_ELEMENTS]: cloneDeep(layerElements),
  [MAP_STYLES]: cloneDeep(mapStyles),
  [MAPBOX_SETTINGS]: cloneDeep(mapboxSettings),
  [MODAL]: cloneDeep(modal),
  [STYLE_LAYERS]: cloneDeep(styleLayersVisibility)
})
/* state debugging tool
const logState = (key: string, status: string): void => {
  console.log(`${key} ${status.toUpperCase()} state:`, getState(key))
}
*/
const getState = (key: string): Record<string, any> => {
  return cloneDeep(state[key])
}
const setState = (key: string, payload: Record<string, any>): void => {
  // logState(key, OLD)
  state[key] = cloneDeep(payload)
  // logState(key, NEW)
}
const store: IStore = {
  state: readonly(state),
  getState,
  setState
}
export default store
