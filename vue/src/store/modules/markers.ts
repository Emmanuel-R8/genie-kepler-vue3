import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import { StoreActions, StoreMutations } from '@/enums'
import { MarkersVisibility } from '@/interfaces'

type State = {
  markers: {
    office: {
      hidden: boolean
      visible: boolean
    }
    places: {
      hidden: boolean
      visible: boolean
    }
    trails: {
      hidden: boolean
      visible: boolean
    }
  }
}

const state: State = {
  markers: {
    office: {
      hidden: false,
      visible: false
    },
    places: {
      hidden: false,
      visible: false
    },
    trails: {
      hidden: false,
      visible: false
    }
  }
}

type Mutations = {
  [StoreMutations.SET_MARKERS_VISIBILITY](state: State, markers: MarkersVisibility): void
}

const mutations: MutationTree<State> & Mutations = {
  [StoreMutations.SET_MARKERS_VISIBILITY](state, markers) {
    state.markers = markers
  }
}

type AugmentedActionContext = Omit<ActionContext<State['markers'], State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

type Actions = {
  [StoreActions.SET_MARKERS_VISIBILITY](context: AugmentedActionContext, id: string): void
}

const actions: ActionTree<State['markers'], State> & Actions = {
  [StoreActions.SET_MARKERS_VISIBILITY]({ commit }, id) {
    const { markers }: any = { ...state.markers }
    markers[id].visible = !markers[id].visible
    commit(StoreMutations.SET_MARKERS_VISIBILITY, markers)
  }
}

type Getters = {
  getMarkersVisibility(state: State['markers']): State['markers']
}

const getters: GetterTree<State['markers'], State> & Getters = {
  getMarkersVisibility(state) {
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

const markers: RouterModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default markers
