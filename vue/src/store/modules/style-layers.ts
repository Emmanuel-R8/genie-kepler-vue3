import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import { StoreActions, StoreMutations } from '@/enums'
import { StyleLayer, StyleLayers } from '@/interfaces'

const state: StyleLayers = {
  styleLayers: {
    biosphere: {
      visible: true
    },
    'biosphere-border': {
      visible: true
    },
    trails: {
      visible: false
    }
  }
}

type Mutations = {
  [StoreMutations.SET_STYLE_LAYERS_VISIBILITY](state: StyleLayers, styleLayers: StyleLayer): void
}

const mutations: MutationTree<StyleLayers> & Mutations = {
  [StoreMutations.SET_STYLE_LAYERS_VISIBILITY](state, styleLayers) {
    state.styleLayers = styleLayers
  }
}

type AugmentedActionContext = Omit<ActionContext<StyleLayers, StyleLayers>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

type Actions = {
  [StoreActions.SET_STYLE_LAYERS_VISIBILITY](context: AugmentedActionContext, id: string): void
}

const actions: ActionTree<StyleLayers, StyleLayers> & Actions = {
  [StoreActions.SET_STYLE_LAYERS_VISIBILITY]({ commit }, id) {
    const { styleLayers }: any = { ...state }
    styleLayers[id].visible = !styleLayers[id].visible
    if (id === 'biosphere') {
      styleLayers['biosphere-border'].visible = !styleLayers['biosphere-border'].visible
    }
    commit(StoreMutations.SET_STYLE_LAYERS_VISIBILITY, styleLayers)
  }
}

type Getters = {
  getStyleLayersVisibility(state: StyleLayers): StyleLayers['styleLayers']
}

const getters: GetterTree<StyleLayers, StyleLayers> & Getters = {
  getStyleLayersVisibility: (state) => {
    return { ...state.styleLayers }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
