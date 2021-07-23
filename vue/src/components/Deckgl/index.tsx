import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

import { DeckglService, EventListenerService, HexagonLayerService, ModalService } from '@/services'
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
    onBeforeMount((): void => {
      showModal()
    })
    onMounted(async (): Promise<void> => {
      await loadHexagonLayer()
      addEventListeners()
    })
    onBeforeUnmount((): void => {
      removeEventListeners()
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

const loadHexagonLayer = async (): Promise<void> => {
  const hexagonLayerService = Container.get(HexagonLayerService)
  await hexagonLayerService.loadHexagonLayer()
}

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

const showModal = (): void => {
  const modalService = Container.get(ModalService)
  modalService.showModal()
}
