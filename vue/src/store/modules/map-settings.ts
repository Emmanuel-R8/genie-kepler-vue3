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
  mapSettings: {
    bearing: number
    bounds: LngLatBoundsLike | null
    center: LngLatLike
    pitch: number
    style: string
    zoom: number
  }
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
  [StoreGetters.getMapSettings](state: State['mapSettings']): State['mapSettings']
}

type RouterModule = {
  namespaced: boolean
  state: State
  mutations: Mutations
  actions: Actions
  getters: Getters
}

const state: State = {
  mapSettings: {
    bearing: config.settings.bearing,
    bounds: config.settings.bounds,
    center: config.settings.center as LngLatLike,
    pitch: config.settings.pitch,
    style: config.settings.style,
    zoom: config.settings.zoom
  }
}

const mutations: MutationTree<State> & Mutations = {
  [StoreMutations.setMapSettings](state, mapSettings) {
    state.mapSettings = { ...mapSettings }
  }
}

const actions: ActionTree<State, State> & Actions = {
  [StoreActions.setMapSettings]({ commit }, mapSettings) {
    commit(StoreMutations.setMapSettings, mapSettings)
  }
}

const getters: GetterTree<State['mapSettings'], State['mapSettings']> & Getters = {
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
