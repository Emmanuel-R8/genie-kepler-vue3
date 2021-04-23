import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import { ui } from '@/config'
import { StoreActions, StoreGetters, StoreMutations } from '@/enums'
import { MapSettings } from '@/interfaces'

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

const {
  mapbox: {
    settings: { bearing, bounds, center, pitch, style, zoom }
  }
} = ui

const state: State = {
  mapSettings: {
    bearing,
    bounds,
    center: center as LngLatLike,
    pitch,
    style,
    zoom
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
