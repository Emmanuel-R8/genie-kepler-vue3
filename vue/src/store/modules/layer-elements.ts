import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import { layer_elements } from '@/config'
import { StoreActions, StoreMutations } from '@/enums'
import { LayerElement, LayerElements } from '@/interfaces'

const state: LayerElements = {
  layerElements: [
    {
      active: layer_elements[0].active,
      id: layer_elements[0].id,
      name: layer_elements[0].name
    },
    {
      active: layer_elements[1].active,
      id: layer_elements[1].id,
      name: layer_elements[1].name
    },
    {
      active: layer_elements[2].active,
      id: layer_elements[2].id,
      name: layer_elements[2].name
    },
    {
      active: layer_elements[3].active,
      id: layer_elements[3].id,
      name: layer_elements[3].name
    },
    {
      active: layer_elements[4].active,
      id: layer_elements[4].id,
      name: layer_elements[4].name
    },
    {
      active: layer_elements[5].active,
      id: layer_elements[5].id,
      name: layer_elements[5].name
    },
    {
      active: layer_elements[6].active,
      id: layer_elements[6].id,
      name: layer_elements[6].name
    }
  ]
}

type Mutations = {
  [StoreMutations.SET_LAYER_ELEMENTS](state: LayerElements, layerElements: LayerElement[]): void
}

const mutations: MutationTree<LayerElements> & Mutations = {
  [StoreMutations.SET_LAYER_ELEMENTS](state, layerElements) {
    state.layerElements = layerElements
  }
}

type AugmentedActionContext = Omit<ActionContext<LayerElements, LayerElements>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

type Actions = {
  [StoreActions.SET_LAYER_ELEMENTS](context: AugmentedActionContext, id: string): void
}

const actions: ActionTree<LayerElements, LayerElements> & Actions = {
  [StoreActions.SET_LAYER_ELEMENTS]({ commit }, id) {
    const layerElements: LayerElement[] = state.layerElements
    const i: number = layerElements.findIndex((obj: LayerElement) => obj.id === id)
    layerElements[i].active = !layerElements[i].active
    commit(StoreMutations.SET_LAYER_ELEMENTS, layerElements)
  }
}

type Getters = {
  getLayerElements(state: LayerElements): LayerElements['layerElements']
}

const getters: GetterTree<LayerElements, LayerElements['layerElements']> & Getters = {
  getLayerElements: (state) => state.layerElements
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
