import { Container } from 'typedi'
import { defineComponent, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

import { EventListenerService, MapService, MapboxService, MarkerService } from '@/services'
import { mapbox } from './index.module.css'

const addEventListeners = (): void => {
  const eventListenerService = Container.get(EventListenerService)
  eventListenerService.addDisplayLayerElementEventListener()
  eventListenerService.addSelectTrailChangeEventListener()
}
const removeEventListeners = (): void => {
  const eventListenerService = Container.get(EventListenerService)
  eventListenerService.removeDisplayLayerElementEventListener()
  eventListenerService.removeSelectTrailChangeEventListener()
}
const removeMapInstance = (): void => {
  const mapboxService = Container.get(MapboxService)
  mapboxService.map.remove()
}
const setMarkerVisibility = (): void => {
  const markerService = Container.get(MarkerService)
  markerService.setMarkerVisibility()
}

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
      addEventListeners()
    })
    onBeforeUnmount((): void => {
      removeEventListeners()
      setMarkerVisibility()
    })
    onUnmounted((): void => {
      removeMapInstance()
    })
    return (): JSX.Element => <div id={container} class={mapbox}></div>
  }
})
