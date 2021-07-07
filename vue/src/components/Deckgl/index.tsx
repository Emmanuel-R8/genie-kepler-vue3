import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted } from 'vue'

import { DeckService, HexagonLayerService } from '@/services'
import { deckgl, hexagon } from './index.module.scss'

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
    })
    onUnmounted((): void => {
      const deckService = Container.get(DeckService)
      const hexagonLayerService = Container.get(HexagonLayerService)
      deckService.map.off('load', deckService.onMapLoadHandler)
      deckService.map.off('load', hexagonLayerService.onMapLoadHandler)
    })
    return (): JSX.Element => (
      <>
        <div id={container} class={deckgl}></div>
        <canvas id={canvas} class={hexagon}></canvas>
      </>
    )
  }
})
