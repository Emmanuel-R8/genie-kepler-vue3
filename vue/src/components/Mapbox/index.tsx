import { Container } from 'typedi'
import { defineComponent, onMounted } from 'vue'

import { MapboxService } from '@/services'
import scss from './index.module.scss'

export default defineComponent({
  setup() {
    const mapboxService: MapboxService = Container.get(MapboxService)

    onMounted(() => {
      mapboxService.loadMap()
    })
    return () => {
      return <div id="mapbox" class={scss.mapbox}></div>
    }
  }
})
