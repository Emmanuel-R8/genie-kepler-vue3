import { LngLatBoundsLike, LngLatLike, Map, NavigationControl } from 'mapbox-gl'
import { defineComponent, onMounted } from 'vue'
import { Store, useStore } from 'vuex'

import config from '../../config/mapbox'
import scss from './index.module.scss'
import store from '../../store'
// import MapSettings from '../../store/modules/map-settings'

export default defineComponent({
  setup() {
    const store: Store<any> = useStore()
    const mapSettings: any = store.getters['mapSettings/getMapSettings']

    onMounted(() => {
      loadMap(mapSettings)
    })
    return () => {
      return <div id="mapbox" class={scss.mapbox}></div>
    }
  }
})

const loadMap: any = (mapSettings: any): Map => {
  const options: any = {
    accessToken: config.settings.accessToken,
    container: config.settings.container,
    doubleClickZoom: config.settings.doubleClickZoom,
    maxZoom: config.settings.maxZoom,
    minZoom: config.settings.minZoom,
    style: 'mapbox://styles/mapbox/outdoors-v11',
    ...mapSettings
  }
  const map: Map = new Map(options)
    .addControl(new NavigationControl(), 'top-left')
    .on('render', () => {
      setMapSettings(map)
    })
  return map
}

const setMapSettings: any = (map: Map): void => {
  const mapSettings: any = {
    bearing: map.getBearing(),
    bounds: map.getBounds() as LngLatBoundsLike,
    center: map.getCenter() as LngLatLike,
    pitch: map.getPitch(),
    zoom: map.getZoom()
  }
  store.commit('mapSettings/SET_MAP_SETTINGS', mapSettings)
}
