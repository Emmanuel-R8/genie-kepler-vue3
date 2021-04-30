import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import { map_styles } from '@/config'
import { StoreActions, StoreMutations } from '@/enums'

type State = {
  mapStyles: {
    active: string
    outdoors: {
      id: string
      url: string
      visible: boolean
    }
    satellite: {
      id: string
      url: string
      visible: boolean
    }
  }
}

const { outdoors, satellite } = map_styles

const state: State = {
  mapStyles: {
    active: outdoors.id,
    outdoors: {
      id: outdoors.id,
      url: outdoors.url,
      visible: outdoors.visible
    },
    satellite: {
      id: satellite.id,
      url: satellite.url,
      visible: satellite.visible
    }
  }
}

type Mutations = {
  [StoreMutations.SET_MAP_STYLES](state: State, mapStyles: State['mapStyles']): void
}

const mutations: MutationTree<State> & Mutations = {
  [StoreMutations.SET_MAP_STYLES](state, mapStyles) {
    state.mapStyles = mapStyles
  }
}

type AugmentedActionContext = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

type Actions = {
  [StoreActions.SET_MAP_STYLES](context: AugmentedActionContext, id: string): void
}

const actions: ActionTree<State, State> & Actions = {
  [StoreActions.SET_MAP_STYLES]({ commit }) {
    let id: string
    const { mapStyles }: any = { ...state }
    mapStyles[mapStyles.active].visible = !mapStyles[mapStyles.active].visible
    mapStyles[mapStyles.active].id === mapStyles.outdoors.id
      ? (id = mapStyles.satellite.id)
      : (id = mapStyles.outdoors.id)
    mapStyles.active = id
    mapStyles[id].visible = !mapStyles[id].visible
    commit(StoreMutations.SET_MAP_STYLES, mapStyles)
  }
}

type Getters = {
  getMapStyles(state: State): State
}

const getters: GetterTree<State, State> & Getters = {
  getMapStyles(state) {
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

const mapStyles: RouterModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default mapStyles
