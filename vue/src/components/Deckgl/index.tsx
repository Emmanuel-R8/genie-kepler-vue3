import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted, PropType } from 'vue'

import { HexagonLayerService } from '@/services'
import scss from './index.module.scss'

const html = (props: Record<string, string>): JSX.Element => (
  <div>
    <div id={props.container} class={scss[props.container]}></div>
    <canvas id={props.canvas} class={scss[props.container]}></canvas>
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
  setup(props: Record<string, string>) {
    const hexagonLayerService: HexagonLayerService = Container.get(HexagonLayerService)
    onMounted((): void => {
      hexagonLayerService.loadHexagonLayer()
    })
    onUnmounted((): void => {
      hexagonLayerService.map.off('load', hexagonLayerService.renderHexagonLayer)
    })
    return (): JSX.Element => html(props)
  }
})
