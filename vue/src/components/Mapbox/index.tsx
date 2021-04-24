import mapboxgl from 'mapbox-gl'
import { Container } from 'typedi'
import { defineComponent, onMounted } from 'vue'

import { DataService, MapboxService } from '@/services'
import scss from './index.module.scss'

const loadMapbox = (): any => {
  const dataService: DataService = Container.get(DataService)
  const mapboxService: MapboxService = Container.get(MapboxService)

  if (!mapboxgl.accessToken) {
    return dataService.getMapboxAccessToken()
  }
  return mapboxService.loadMapbox()
}

export default defineComponent({
  setup() {
    onMounted(() => {
      loadMapbox()
    })
    return () => {
      return <div id="mapbox" class={scss.mapbox}></div>
    }
  }
})
