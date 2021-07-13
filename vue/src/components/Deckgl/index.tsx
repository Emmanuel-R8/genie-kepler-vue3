import { Container } from 'typedi'
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'

import { EventService, HexagonLayerService, MapStyleService, MarkerService } from '@/services'
import { deckgl, hexagonLayer } from './index.module.css'

const addEventListeners = (): void => {
  const eventService = Container.get(EventService)
  eventService.setHexagonLayerEventListeners(true)
}
const removeEventListeners = (): void => {
  const eventService = Container.get(EventService)
  eventService.setHexagonLayerEventListeners(false)
  eventService.removeDeckglEventListeners()
}
const setMarkerVisibility = (): void => {
  const markerService = Container.get(MarkerService)
  const mapStyleService = Container.get(MapStyleService)
  const { mapStyle } = mapStyleService
  mapStyle.includes('satellite')
    ? setTimeout((): void => markerService.setMarkerVisibility(), 500)
    : setTimeout((): void => markerService.setMarkerVisibility(), 1000)
}

export default defineComponent({
  props: {
    canvas: {
      type: String,
      required: true
    },
    container: {
      type: String,
      required: true
    }
  },
  setup({ canvas, container }) {
    onMounted(async (): Promise<void> => {
      const hexagonLayerService = Container.get(HexagonLayerService)
      await hexagonLayerService.loadHexagonLayer()
      addEventListeners()
    })
    onBeforeUnmount((): void => {
      removeEventListeners()
      setMarkerVisibility()
    })
    return (): JSX.Element => (
      <>
        <div id={container} class={deckgl}></div>
        <canvas id={canvas} class={hexagonLayer}></canvas>
      </>
    )
  }
})
