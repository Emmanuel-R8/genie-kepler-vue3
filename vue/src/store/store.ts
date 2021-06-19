import cloneDeep from 'lodash.clonedeep'
import { reactive } from 'vue'

import { deckgl, hexagonLayer, layerElements, mapbox, modal, styleLayers } from '@/config'
import { IStore } from '@/interfaces'

const { settings: deckglViewSettings } = deckgl
const { settings: mapboxSettings, styles: mapStyles } = mapbox
const { reactiveProps: hexagonLayerReactiveProps } = hexagonLayer
const state: Record<string, any> = reactive({
  deckglViewSettings,
  hexagonLayerReactiveProps,
  layerElements,
  mapStyles,
  mapboxSettings,
  modal,
  styleLayers
})
/* state debugging tool
const logState = (key: string, status: string): void => {
  console.log(`${key} ${status} state:`, getState(key))
}
*/
const getState = (key: string): Record<string, any> => {
  /* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
  return cloneDeep(state[key])
}
const setState = (key: string, payload: Record<string, any>): void => {
  // logState(key, 'OLD')
  state[key] = cloneDeep(payload)
  // logState(key, 'NEW')
}
const store: IStore = {
  getState,
  setState
}
export default store
