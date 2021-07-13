import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { IHexagonLayerProps } from '@/interfaces'
import { HexagonLayerService } from '@/services'
import { hexagon } from './index.module.css'

const html = ({
  coverage,
  elevationScale,
  radius,
  upperPercentile
}: IHexagonLayerProps): JSX.Element => (
  <HexagonUI
    class={hexagon}
    coverage={coverage}
    elevationScale={elevationScale}
    radius={radius}
    upperPercentile={upperPercentile}
  />
)

export default defineComponent({
  setup() {
    const hexagonLayerService = Container.get(HexagonLayerService)
    const state = computed((): IHexagonLayerProps => hexagonLayerService.state)
    return (): JSX.Element => html(state.value)
  }
})
