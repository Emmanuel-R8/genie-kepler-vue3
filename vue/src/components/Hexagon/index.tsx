import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { IHexagonLayerReactiveProps } from '@/interfaces'
import { HexagonLayerService, RouteService } from '@/services'
import { hexagon } from './index.module.scss'

export default defineComponent({
  setup() {
    const hexagonLayerService = Container.get(HexagonLayerService)
    const state = computed((): IHexagonLayerReactiveProps => hexagonLayerService.state)
    return (): JSX.Element => html(state.value)
  }
})

const html = ({
  coverage,
  elevationScale,
  radius,
  upperPercentile
}: IHexagonLayerReactiveProps): JSX.Element => (
  <HexagonUI
    class={hexagon}
    coverage={coverage}
    elevationScale={elevationScale}
    radius={radius}
    upperPercentile={upperPercentile}
    setHexagonLayerReactiveProps={onSetHexagonLayerReactivePropsChangeHandler}
    resetHexagonLayerReactiveProps={onResetHexagonLayerReactivePropsClickHandler}
    returnToTrails={onReturnToTrailsClickHandler}
  />
)
const onSetHexagonLayerReactivePropsChangeHandler = (evt: Event): void => {
  evt.stopPropagation()
  /* prettier-ignore */
  const { target: { id: prop, value } }: Record<string, any> = evt
  const hexagonLayerService = Container.get(HexagonLayerService)
  prop && value && hexagonLayerService.setHexagonLayerReactiveProps(prop, value)
}
const onResetHexagonLayerReactivePropsClickHandler = (evt: Event): void => {
  evt.stopPropagation()
  const hexagonLayerService = Container.get(HexagonLayerService)
  hexagonLayerService.resetHexagonLayerReactiveProps()
}
const onReturnToTrailsClickHandler = async (evt: Event): Promise<void> => {
  evt.stopPropagation()
  /* prettier-ignore */
  const { target: { id } }: Record<string, any> = evt
  const routeService = Container.get(RouteService)
  id && (await routeService.setRoute(id))
}
