import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted } from 'vue'

import { deckgl } from '@/config'
import { HexagonService } from '@/services'
import scss from './index.module.scss'

const html = (canvas: string, container: string): JSX.Element => (
  <div>
    <div id={container} class={scss[container]}></div>
    <canvas id={canvas} class={scss[container]}></canvas>
  </div>
)

export default defineComponent({
  setup() {
    /* prettier-ignore */
    const { hexagonOptions: { canvas, container } } = deckgl
    const hexagonService: HexagonService = Container.get(HexagonService)
    onMounted((): void => {
      hexagonService.loadMap()
    })
    onUnmounted((): void => {
      hexagonService.map.off('load', hexagonService.setHexagonLayer)
    })
    return (): JSX.Element => html(canvas, container)
  }
})
