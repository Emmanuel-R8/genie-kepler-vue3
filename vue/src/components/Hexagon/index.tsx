import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { Routes, StoreStates } from '@/enums'
import { IHexagonLayerReactiveProps } from '@/interfaces'
import { router } from '@/router'
import { HexagonLayerService, StoreService } from '@/services'
import scss from './index.module.scss'

const onSetHexagonLayerReactivePropsHandler = (evt: Event): void => {
  evt.stopPropagation()
  const { target }: Record<string, any> = evt
  const { HEXAGON_LAYER_REACTIVE_PROPS } = StoreStates
  const hexagonLayerService = Container.get(HexagonLayerService)
  const storeService = Container.get(StoreService)
  target && storeService.setState(HEXAGON_LAYER_REACTIVE_PROPS, target)
  target && hexagonLayerService.renderHexagonLayer()
}
const onResetHexagonLayerReactivePropsHandler = (evt: Event): void => {
  evt.stopPropagation()
  const hexagonLayerService = Container.get(HexagonLayerService)
  hexagonLayerService.resetHexagonLayerReactiveProps()
}
const onReturnToTrailsHandler = (evt: Event): void => {
  evt.stopPropagation()
  const { MAPBOX } = Routes
  router.push({ name: MAPBOX })
}
const html = (props: IHexagonLayerReactiveProps): JSX.Element => (
  <HexagonUI
    class={scss.hexagon}
    coverage={props.coverage}
    elevationScale={props.elevationScale}
    radius={props.radius}
    upperPercentile={props.upperPercentile}
    setHexagonLayerReactiveProps={onSetHexagonLayerReactivePropsHandler}
    resetHexagonLayerReactiveProps={onResetHexagonLayerReactivePropsHandler}
    returnToTrails={onReturnToTrailsHandler}
  />
)

export default defineComponent({
  setup() {
    const { HEXAGON_LAYER_REACTIVE_PROPS } = StoreStates
    const storeService = Container.get(StoreService)
    const reactiveProps = computed(
      (): IHexagonLayerReactiveProps => storeService.getState(HEXAGON_LAYER_REACTIVE_PROPS)
    )
    return (): JSX.Element => html(reactiveProps.value)
  }
})
