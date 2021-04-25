import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import { StoreActions, StoreMutations } from '@/enums'
import { LayersVisibility } from '@/interfaces'

type State = {
  layers: {
    biosphere: {
      active: boolean
    }
    trails: {
      active: boolean
    }
  }
}

const state: State = {
  layers: {
    biosphere: {
      active: true
    },
    trails: {
      active: false
    }
  }
}

type Mutations = {
  [StoreMutations.SET_LAYERS_VISIBILITY](state: State, layers: LayersVisibility): void
}

const mutations: MutationTree<State> & Mutations = {
  [StoreMutations.SET_LAYERS_VISIBILITY](state, layers) {
    state.layers = layers
  }
}

type AugmentedActionContext = Omit<ActionContext<State['layers'], State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

type Actions = {
  [StoreActions.SET_LAYERS_VISIBILITY](context: AugmentedActionContext, id: string): void
}

const actions: ActionTree<State['layers'], State> & Actions = {
  [StoreActions.SET_LAYERS_VISIBILITY]({ commit }, id) {
    const { layers }: any = { ...state.layers }
    layers[id].active = !layers[id].active
    commit(StoreMutations.SET_LAYERS_VISIBILITY, layers)
  }
}

type Getters = {
  getLayersVisibility(state: State['layers']): State['layers']
}

const getters: GetterTree<State['layers'], State> & Getters = {
  getLayersVisibility(state) {
    return { ...state }
  }
}

type RouterModule = {
  namespaced: boolean
  state: State
  mutations: Mutations
  actions: Actions
  getters: Getters
}

const layers: RouterModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default layers
