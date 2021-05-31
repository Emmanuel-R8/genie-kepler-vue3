import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted, PropType } from 'vue'

import { DeckService, HexagonLayerService } from '@/services'
import scss from './index.module.scss'

const html = (props: Record<string, any>): JSX.Element => (
  <div>
    <div id={props.container} class={scss[props.container]}></div>
    <canvas id={props.canvas} class={scss[props.canvas]}></canvas>
  </div>
)

export default defineComponent({
  props: {
    canvas: {
      type: String as PropType<string>,
      required: true
    },
    container: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const deckService = Container.get(DeckService)
    const hexagonLayerService = Container.get(HexagonLayerService)
    onMounted((): void => {
      hexagonLayerService.loadHexagonLayer()
    })
    onUnmounted((): void => {
      deckService.map.off('load', deckService.onMapLoadHandler)
      hexagonLayerService.map.off('load', hexagonLayerService.onMapLoadHandler)
    })
    return (): JSX.Element => html(props)
  }
})
