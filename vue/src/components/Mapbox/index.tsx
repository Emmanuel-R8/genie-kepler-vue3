import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted } from 'vue'

import { MapService, MapboxService, MarkerService } from '@/services'
import { mapbox } from './index.module.scss'

export default defineComponent({
  props: {
    container: {
      type: String,
      required: true
    }
  },
  setup({ container }) {
    onMounted(async (): Promise<void> => {
      const mapService = Container.get(MapService)
      await mapService.loadMapLayer()
      setMarkerVisibility()
    })
    onUnmounted((): void => {
      const mapService = Container.get(MapService)
      const mapboxService = Container.get(MapboxService)
      mapboxService.map.off('click', mapService.onMapClickHandler)
      mapboxService.map.off('load', mapService.onMapLoadHandler)
      mapboxService.map.off('mouseenter', mapService.onMapMouseEnterHandler)
      mapboxService.map.off('mouseleave', mapService.onMapMouseLeaveHandler)
      mapboxService.map.off('idle', mapboxService.onMapIdleHandler)
      mapboxService.map.off('load', mapboxService.onMapLoadHandler)
      setMarkerVisibility()
    })
    return (): JSX.Element => <div id={container} class={mapbox}></div>
  }
})

const setMarkerVisibility = (): void => {
  const markerService = Container.get(MarkerService)
  setTimeout((): void => markerService.setMarkerVisibility(), 1000)
}
