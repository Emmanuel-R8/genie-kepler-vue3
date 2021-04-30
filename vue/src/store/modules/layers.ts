import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import { StoreActions, StoreMutations } from '@/enums'

type State = {
  layers: {
    biosphere: {
      visible: boolean
    }
    'biosphere-border': {
      visible: boolean
    }
    trails: {
      visible: boolean
    }
  }
}

const state: State = {
  layers: {
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
  [StoreMutations.SET_LAYERS_VISIBILITY](state: State, layers: State['layers']): void
}

const mutations: MutationTree<State> & Mutations = {
  [StoreMutations.SET_LAYERS_VISIBILITY](state, layers) {
    state.layers = layers
  }
}

type AugmentedActionContext = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

type Actions = {
  [StoreActions.SET_LAYERS_VISIBILITY](context: AugmentedActionContext, id: string): void
}

const actions: ActionTree<State, State> & Actions = {
  [StoreActions.SET_LAYERS_VISIBILITY]({ commit }, id) {
    const { layers }: any = { ...state }
    layers[id].visible = !layers[id].visible
    if (id === 'biosphere') {
      layers['biosphere-border'].visible = !layers['biosphere-border'].visible
    }
    commit(StoreMutations.SET_LAYERS_VISIBILITY, layers)
  }
}

type Getters = {
  getLayersVisibility(state: State): State
}

const getters: GetterTree<State, State> & Getters = {
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
