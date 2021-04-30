import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import { layer_elements } from '@/config'
import { StoreActions, StoreMutations } from '@/enums'

type State = {
  layerElements: [
    {
      active: boolean
      class: string
      id: string
      name: string
    },
    {
      active: boolean
      class: string
      id: string
      name: string
    },
    {
      active: boolean
      class: string
      id: string
      name: string
    },
    {
      active: boolean
      class: string
      id: string
      name: string
    },
    {
      active: boolean
      class: string
      id: string
      name: string
    },
    {
      active: boolean
      class: string
      id: string
      name: string
    },
    {
      active: boolean
      class: string
      id: string
      name: string
    }
  ]
}

const state: State = {
  layerElements: [
    {
      active: layer_elements[0].active,
      class: layer_elements[0].class,
      id: layer_elements[0].id,
      name: layer_elements[0].name
    },
    {
      active: layer_elements[1].active,
      class: layer_elements[1].class,
      id: layer_elements[1].id,
      name: layer_elements[1].name
    },
    {
      active: layer_elements[2].active,
      class: layer_elements[2].class,
      id: layer_elements[2].id,
      name: layer_elements[2].name
    },
    {
      active: layer_elements[3].active,
      class: layer_elements[3].class,
      id: layer_elements[3].id,
      name: layer_elements[3].name
    },
    {
      active: layer_elements[4].active,
      class: layer_elements[4].class,
      id: layer_elements[4].id,
      name: layer_elements[4].name
    },
    {
      active: layer_elements[5].active,
      class: layer_elements[5].class,
      id: layer_elements[5].id,
      name: layer_elements[5].name
    },
    {
      active: layer_elements[6].active,
      class: layer_elements[6].class,
      id: layer_elements[6].id,
      name: layer_elements[6].name
    }
  ]
}

type Mutations = {
  [StoreMutations.SET_LAYER_ELEMENTS](state: State, layerElements: State['layerElements']): void
}

const mutations: MutationTree<State> & Mutations = {
  [StoreMutations.SET_LAYER_ELEMENTS](state, layerElements) {
    state.layerElements = layerElements
  }
}

type AugmentedActionContext = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

type Actions = {
  [StoreActions.SET_LAYER_ELEMENTS](context: AugmentedActionContext, i: number): void
}

const actions: ActionTree<State, State> & Actions = {
  [StoreActions.SET_LAYER_ELEMENTS]({ commit }, i: number) {
    const { layerElements } = { ...state }
    layerElements[i].active = !layerElements[i].active
    layerElements[i].active ? (layerElements[i].class = 'active') : (layerElements[i].class = '')
    commit(StoreMutations.SET_LAYER_ELEMENTS, layerElements)
  }
}

type Getters = {
  getLayerElements(state: State): State
}

const getters: GetterTree<State, State> & Getters = {
  getLayerElements(state) {
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

const layerElements: RouterModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default layerElements
