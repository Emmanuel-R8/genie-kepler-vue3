import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import { layerElements } from '@/config'
import { StoreActions, StoreMutations } from '@/enums'
import { LayerElement, LayerElements } from '@/interfaces'

const state: LayerElements = {
  layerElements
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
    const layerElements: LayerElement[] = [...state.layerElements]
    const i: number = layerElements.findIndex((el: LayerElement) => el.id === id)
    layerElements[i].active = !layerElements[i].active
    commit(StoreMutations.SET_LAYER_ELEMENTS, layerElements)
  }
}

type Getters = {
  getLayerElements(state: LayerElements): LayerElements['layerElements']
}

const getters: GetterTree<LayerElements, LayerElements> & Getters = {
  getLayerElements: (state) => state.layerElements
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
