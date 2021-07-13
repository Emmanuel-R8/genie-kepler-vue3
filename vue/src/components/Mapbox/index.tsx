import { Container } from 'typedi'
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'

import { EventService, MapService, MarkerService } from '@/services'
import { mapbox } from './index.module.css'

const addEventListeners = (): void => {
  const eventService = Container.get(EventService)
  eventService.setDisplayLayerElementEventListener(true)
  eventService.setSelectTrailChangeEventListener(true)
}
const removeEventListeners = (): void => {
  const eventService = Container.get(EventService)
  eventService.setDisplayLayerElementEventListener(false)
  eventService.setSelectTrailChangeEventListener(false)
  eventService.removeMapboxEventListeners()
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
    return (): JSX.Element => <div id={container} class={mapbox}></div>
  }
})
