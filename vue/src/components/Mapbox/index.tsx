import { LngLatBoundsLike, LngLatLike, Map, NavigationControl } from 'mapbox-gl'
import { defineComponent, onMounted } from 'vue'

import config from '@/config/mapbox'
import scss from './index.module.scss'
import store from '@/store'
import { StoreActions, StoreGetters } from '@/store/enums'

interface MapSettings {
  bearing: number
  bounds: LngLatBoundsLike
  center: LngLatLike
  pitch: number
  style: string
  zoom: number
}

interface MapOptions extends MapSettings {
  accessToken: string
  container: string
  doubleClickZoom: boolean
  maxZoom: number
  minZoom: number
}

let map: Map
let mapStyle: string

const loadMap = (mapSettings: MapSettings): void => {
  const mapOptions: MapOptions = {
    accessToken: config.settings.accessToken,
    container: config.settings.container,
    doubleClickZoom: config.settings.doubleClickZoom,
    maxZoom: config.settings.maxZoom,
    minZoom: config.settings.minZoom,
    ...mapSettings
  }

  map = new Map(mapOptions)
    .addControl(new NavigationControl(), 'top-left')
    .on('load', () => {
      return true
    })
    .on('render', () => {
      setMapSettings()
    })
}

const setMapSettings = (): void => {
  const mapSettings: MapSettings = {
    bearing: map.getBearing(),
    bounds: map.getBounds() as LngLatBoundsLike,
    center: map.getCenter() as LngLatLike,
    pitch: map.getPitch(),
    style: mapStyle,
    zoom: map.getZoom()
  }

  store.dispatch(`mapSettings/${StoreActions.setMapSettings}`, mapSettings)
}

export default defineComponent({
  setup() {
    const mapSettings: MapSettings = store.getters[`mapSettings/${StoreGetters.getMapSettings}`]
    mapStyle = mapSettings.style

    onMounted(() => {
      loadMap(mapSettings)
    })
    return () => {
      return <div id="mapbox" class={scss.mapbox}></div>
    }
  }
})
