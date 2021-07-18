import { Container } from 'typedi'
import { defineComponent, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

import {
  DeckglService,
  EventListenerService,
  HexagonLayerService,
  MapStyleService,
  MarkerService
} from '@/services'
import { deckgl, hexagonLayer } from './index.module.css'

const addEventListeners = (): void => {
  const eventListenerService = Container.get(EventListenerService)
  eventListenerService.addHexagonLayerEventListeners()
}
const removeEventListeners = (): void => {
  const eventListenerService = Container.get(EventListenerService)
  eventListenerService.removeHexagonLayerEventListeners()
}
const removeDeckInstance = (): void => {
  const deckglService = Container.get(DeckglService)
  /* eslint-disable-next-line */
  deckglService.deck.finalize()
}
const removeMapInstance = (): void => {
  const deckglService = Container.get(DeckglService)
  deckglService.map.remove()
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
    onUnmounted((): void => {
      removeDeckInstance()
      removeMapInstance()
    })
    return (): JSX.Element => (
      <>
        <div id={container} class={deckgl}></div>
        <canvas id={canvas} class={hexagonLayer}></canvas>
      </>
    )
  }
})
