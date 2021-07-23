import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { IHexagonLayerProps } from '@/interfaces'
import { HexagonLayerService } from '@/services'
import { hexagonUI } from './index.module.css'

export default defineComponent({
  setup() {
    const hexagonLayerPropsState = getHexagonLayerPropsState()
    return (): JSX.Element => html(hexagonLayerPropsState.value)
  }
})

const html = ({
  coverage,
  elevationScale,
  radius,
  upperPercentile
}: IHexagonLayerProps): JSX.Element => (
  <HexagonUI
    class={hexagonUI}
    coverage={coverage}
    elevationScale={elevationScale}
    radius={radius}
    upperPercentile={upperPercentile}
  />
)

const getHexagonLayerPropsState = (): ComputedRef<IHexagonLayerProps> => {
  const hexagonLayerService = Container.get(HexagonLayerService)
  return computed((): IHexagonLayerProps => hexagonLayerService.state)
}
