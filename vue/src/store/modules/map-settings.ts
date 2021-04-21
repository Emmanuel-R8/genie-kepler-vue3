import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'
// import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import config from '../../config/mapbox'

type State = {
  bearing: number
  bounds: LngLatBoundsLike | null
  center: LngLatLike
  pitch: number
  // style: string
  zoom: number
}

const state: State = {
  bearing: config.settings.bearing,
  bounds: config.settings.bounds,
  center: config.settings.center as LngLatLike,
  pitch: config.settings.pitch,
  // style: config.settings.style,
  zoom: config.settings.zoom
}

// export enum MutationTypes {
//   SetMapSettings = 'SET_MAP_SETTINGS'
// }

// export type Mutations = {
//   [MutationTypes.SetMapSettings](state: State, mapSettings: any): void
// }

// const mutations: MutationTree<State> & Mutations = {
//   [MutationTypes.SetMapSettings](mapSettings) {
//     state = { ...state, ...mapSettings }
//   }
// }

const mutations: any = {
  SET_MAP_SETTINGS(state: State, mapSettings: State) {
    state.bearing = mapSettings.bearing
    state.bounds = mapSettings.bounds
    state.center = mapSettings.center
    state.pitch = mapSettings.pitch
    state.zoom = mapSettings.zoom
  }
}

// enum ActionTypes {
//   SetMapSettings = 'SET_MAP_SETTINGS'
// }

// type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
//   commit<K extends keyof Mutations>(
//     key: K,
//     payload: Parameters<Mutations[K]>[1]
//   ): ReturnType<Mutations[K]>
// }

// type Actions = {
//   [ActionTypes.SetMapSettings](context: ActionAugments, mapSettings: any): void
// }

// const actions: ActionTree<State, State> & Actions = {
//   [ActionTypes.SetMapSettings]({ commit }, mapSettings) {
//     commit(MutationTypes.SetMapSettings, mapSettings)
//   }
// }

const actions: any = {
  setMapSettings({ commit }, mapSettings: any): void {
    commit('SET_MAP_SETTINGS', mapSettings)
  }
}

// type Getters = {
//   getMapSettings(state: any): any
// }

const getters: any = {
  getMapSettings(state: State): any {
    return { ...state }
  }
}

type Module = {
  namespaced: boolean
  state: State
  mutations: any
  actions: any
  getters: any
}

const mapSettings: Module = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default mapSettings
