import { Container } from 'typedi'
import { defineComponent, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

import {
  EventListenerService,
  MapService,
  MapboxService,
  MapStyleService,
  MarkerService
} from '@/services'
import { outdoors, satellite } from './index.module.css'

export default defineComponent({
  props: {
    container: {
      type: String,
      required: true
    }
  },
  setup(props: Record<string, string>) {
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
    const { mapStyle } = Container.get(MapStyleService)
    return (): JSX.Element => html(props, mapStyle)
  }
})

const html = ({ container }: Record<string, string>, mapStyle: string): JSX.Element => (
  <div id={container} class={mapStyle.includes('outdoors') ? outdoors : satellite}></div>
)

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
  mapboxService.removeMapInstance()
}

const setMarkerVisibility = (): void => {
  const markerService = Container.get(MarkerService)
  markerService.setMarkerVisibility()
}
