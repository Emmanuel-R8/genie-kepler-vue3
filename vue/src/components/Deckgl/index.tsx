import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted } from 'vue'

import { DeckService, HexagonLayerService } from '@/services'
import scss from './index.module.scss'

type Props = {
  canvas: string
  container: string
}

const html = ({ canvas, container }: Props): JSX.Element => (
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
  setup(props: Props) {
    const hexagonLayerService = Container.get(HexagonLayerService)
    onMounted(async (): Promise<void> => {
      await hexagonLayerService.loadHexagonLayer()
    })
    onUnmounted((): void => {
      const deckService = Container.get(DeckService)
      /* eslint-disable @typescript-eslint/unbound-method */
      deckService.map.off('load', () => deckService.onMapLoadHandler)
      hexagonLayerService.map.off('load', hexagonLayerService.onMapLoadHandler)
    })
    return (): JSX.Element => html(props)
  }
})
