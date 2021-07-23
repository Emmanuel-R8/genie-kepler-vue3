import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

import {
  EventListenerService,
  MapService,
  MapboxService,
  MapStyleService,
  MarkerService,
  ModalService
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
    onBeforeMount((): void => {
      setMarkerVisibility()
      showModal()
    })
    onMounted(async (): Promise<void> => {
      await loadMapLayer()
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

const loadMapLayer = async (): Promise<void> => {
  const mapService = Container.get(MapService)
  await mapService.loadMapLayer()
}

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
  const { mapStyle } = Container.get(MapStyleService)
  mapStyle.includes('outdoors')
    ? setTimeout((): void => markerService.setMarkerVisibility(), 2000)
    : setTimeout((): void => markerService.setMarkerVisibility(), 250)
}

const showModal = (): void => {
  const modalService = Container.get(ModalService)
  modalService.showModal()
}
