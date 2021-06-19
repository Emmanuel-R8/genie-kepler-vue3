import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { Routes } from '@/enums'
import { IHexagonLayerReactiveProps } from '@/interfaces'
import { router } from '@/router'
import { HexagonLayerService } from '@/services'
import scss from './index.module.scss'

const onSetHexagonLayerReactivePropsHandler = (evt: Event): void => {
  evt.stopPropagation()
  /* prettier-ignore */
  const { target: { id: prop, value } }: Record<string, any> = evt
  const hexagonLayerService = Container.get(HexagonLayerService)
  prop && value && hexagonLayerService.setHexagonLayerReactiveProps(prop, value)
}
const onResetHexagonLayerReactivePropsHandler = (evt: Event): void => {
  evt.stopPropagation()
  const hexagonLayerService = Container.get(HexagonLayerService)
  hexagonLayerService.resetHexagonLayerReactiveProps()
}
const onReturnToTrailsHandler = async (evt: Event): Promise<void> => {
  evt.stopPropagation()
  const { MAPBOX } = Routes
  await router.push({ name: MAPBOX })
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
    setHexagonLayerReactiveProps={onSetHexagonLayerReactivePropsHandler}
    resetHexagonLayerReactiveProps={onResetHexagonLayerReactivePropsHandler}
    returnToTrails={onReturnToTrailsHandler}
  />
)

export default defineComponent({
  setup() {
    const hexagonLayerService = Container.get(HexagonLayerService)
    const state = computed((): IHexagonLayerReactiveProps => hexagonLayerService.state)
    return (): JSX.Element => html(state.value)
  }
})
