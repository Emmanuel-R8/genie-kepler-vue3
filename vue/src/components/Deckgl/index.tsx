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
  setup(props: Record<string, string>) {
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
    return (): JSX.Element => html(props)
  }
})

const html = ({ canvas, container }: Record<string, string>): JSX.Element => (
  <>
    <div id={container} class={deckgl}></div>
    <canvas id={canvas} class={hexagonLayer}></canvas>
  </>
)

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
  deckglService.removeDeckInstance()
}

const removeMapInstance = (): void => {
  const deckglService = Container.get(DeckglService)
  deckglService.removeMapInstance()
}

const setMarkerVisibility = (): void => {
  const markerService = Container.get(MarkerService)
  const { mapStyle } = Container.get(MapStyleService)
  mapStyle.includes('satellite')
    ? setTimeout((): void => markerService.setMarkerVisibility(), 500)
    : setTimeout((): void => markerService.setMarkerVisibility(), 1000)
}
