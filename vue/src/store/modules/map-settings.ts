import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import config from '@/config/mapbox'
import { StoreActions, StoreGetters, StoreMutations } from '../enums'

type MapSettings = {
  bearing: number
  bounds: LngLatBoundsLike
  center: LngLatLike
  pitch: number
  style: string
  zoom: number
}

type State = {
  bearing: number
  bounds: LngLatBoundsLike | null
  center: LngLatLike
  pitch: number
  style: string
  zoom: number
}

type Mutations = {
  [StoreMutations.setMapSettings](state: State, mapSettings: MapSettings): void
}

type Context = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

type Actions = {
  [StoreActions.setMapSettings](context: Context, mapSettings: MapSettings): void
}

type Getters = {
  [StoreGetters.getMapSettings](state: State): State
}

type RouterModule = {
  namespaced: boolean
  state: State
  mutations: Mutations
  actions: Actions
  getters: Getters
}

const state: State = {
  bearing: config.settings.bearing,
  bounds: config.settings.bounds,
  center: config.settings.center as LngLatLike,
  pitch: config.settings.pitch,
  style: config.settings.style,
  zoom: config.settings.zoom
}

const mutations: MutationTree<State> & Mutations = {
  [StoreMutations.setMapSettings](state, mapSettings) {
    state.bearing = mapSettings.bearing
    state.bounds = mapSettings.bounds
    state.center = mapSettings.center
    state.pitch = mapSettings.pitch
    state.style = mapSettings.style
    state.zoom = mapSettings.zoom
  }
}

const actions: ActionTree<State, State> & Actions = {
  [StoreActions.setMapSettings]({ commit }, mapSettings) {
    commit(StoreMutations.setMapSettings, mapSettings)
  }
}

const getters: GetterTree<State, State> & Getters = {
  [StoreGetters.getMapSettings](state) {
    return { ...state }
  }
}

const mapSettings: RouterModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default mapSettings
