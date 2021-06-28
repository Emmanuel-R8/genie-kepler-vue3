import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { Routes } from '@/enums'
import { IHexagonLayerReactiveProps } from '@/interfaces'
import { HexagonLayerService, RouteService } from '@/services'
import scss from './index.module.scss'

const onSetHexagonLayerReactivePropsChangeHandler = (evt: Event): void => {
  evt.stopPropagation()
  /* prettier-ignore */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
  const { MAPBOX } = Routes
  const routeService = Container.get(RouteService)
  await routeService.setRoute(MAPBOX)
}
const html = ({
  coverage,
  elevationScale,
  radius,
  upperPercentile
}: IHexagonLayerReactiveProps): JSX.Element => (
  <HexagonUI
    class={scss.hexagon}
    coverage={coverage}
    elevationScale={elevationScale}
    radius={radius}
    upperPercentile={upperPercentile}
    setHexagonLayerReactiveProps={onSetHexagonLayerReactivePropsChangeHandler}
    resetHexagonLayerReactiveProps={onResetHexagonLayerReactivePropsClickHandler}
    returnToTrails={onReturnToTrailsClickHandler}
  />
)

export default defineComponent({
  setup() {
    const hexagonLayerService = Container.get(HexagonLayerService)
    const state = computed((): IHexagonLayerReactiveProps => hexagonLayerService.state)
    return (): JSX.Element => html(state.value)
  }
})
