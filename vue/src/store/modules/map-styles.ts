import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import { map_styles } from '@/config'
import { MapStyle, MapStyles } from '@/interfaces'
import { StoreActions, StoreMutations } from '@/enums'

const { outdoors, satellite } = map_styles

const state: MapStyles = {
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
  [StoreMutations.SET_MAP_STYLES](state: MapStyles, mapStyles: MapStyle): void
}

const mutations: MutationTree<MapStyles> & Mutations = {
  [StoreMutations.SET_MAP_STYLES](state, mapStyles) {
    state.mapStyles = mapStyles
  }
}

type AugmentedActionContext = Omit<ActionContext<MapStyles, MapStyles>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}

type Actions = {
  [StoreActions.SET_MAP_STYLES](context: AugmentedActionContext, id: string): void
}

const actions: ActionTree<MapStyles, MapStyles> & Actions = {
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
  getMapStyles(state: MapStyles): MapStyles
}

const getters: GetterTree<MapStyles, MapStyles> & Getters = {
  getMapStyles: (state) => state
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
