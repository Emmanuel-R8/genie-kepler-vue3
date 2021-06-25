import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted } from 'vue'

import { DeckglProps } from '@/types'
import { DeckService, HexagonLayerService } from '@/services'
import scss from './index.module.scss'

const html = ({ canvas, container }: DeckglProps): JSX.Element => (
  <div>
    <div id={container} class={scss[container]}></div>
    <canvas id={canvas} class={scss[canvas]}></canvas>
  </div>
)

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
  setup(props: DeckglProps) {
    onMounted(async (): Promise<void> => {
      const hexagonLayerService = Container.get(HexagonLayerService)
      await hexagonLayerService.loadHexagonLayer()
    })
    onUnmounted((): void => {
      const deckService = Container.get(DeckService)
      const hexagonLayerService = Container.get(HexagonLayerService)
      /* eslint-disable @typescript-eslint/unbound-method */
      deckService.map.off('load', deckService.onMapLoadHandler)
      deckService.map.off('load', hexagonLayerService.onMapLoadHandler)
    })
    return (): JSX.Element => html(props)
  }
})
