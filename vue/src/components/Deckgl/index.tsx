import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted } from 'vue'

import { deckgl } from '@/config'
import { HexagonService } from '@/services'
import scss from './index.module.scss'

const hexagonService: HexagonService = Container.get(HexagonService)

export default defineComponent({
  setup() {
    /* prettier-ignore */
    const { hexagonOptions: { container } } = deckgl
    onMounted((): void => {
      hexagonService.loadMap()
    })
    onUnmounted((): void => {
      hexagonService.map.off('idle', hexagonService.setHexagonSettings)
      // hexagonService.map.off('load', hexagonService.setHexagonLayer)
    })
    return (): JSX.Element => <div id={container} class={scss.deckgl}></div>
  }
})
