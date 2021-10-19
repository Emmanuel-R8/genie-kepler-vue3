import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { IHexagonLayerReactiveProps } from '@/interfaces'
import { HexagonLayerService } from '@/services'
import { hexagonUI } from './index.module.css'

export default defineComponent({
  setup() {
    const hexagonLayerReactivePropsState = getHexagonLayerReactivePropsState()
    return (): JSX.Element => html(hexagonLayerReactivePropsState.value)
  }
})

const html = ({ coverage, elevationScale, radius, upperPercentile }: IHexagonLayerReactiveProps): JSX.Element => (
  <HexagonUI
    class={hexagonUI}
    coverage={coverage}
    elevationScale={elevationScale}
    radius={radius}
    upperPercentile={upperPercentile}
  />
)

const getHexagonLayerReactivePropsState = (): ComputedRef<IHexagonLayerReactiveProps> => {
  const hexagonLayerService = Container.get(HexagonLayerService)
  return computed((): IHexagonLayerReactiveProps => hexagonLayerService.state)
}
