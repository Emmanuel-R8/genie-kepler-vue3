import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted, PropType } from 'vue'

import { HexagonService } from '@/services'
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
    const hexagonService: HexagonService = Container.get(HexagonService)
    onMounted((): void => {
      hexagonService.loadHexagonLayer()
    })
    onUnmounted((): void => {
      hexagonService.map.off('load', hexagonService.renderHexagonLayer)
    })
    return (): JSX.Element => html(props)
  }
})
