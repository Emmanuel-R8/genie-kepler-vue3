import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { Routes } from '@/enums'
import { IHexagonLayerReactiveProps } from '@/interfaces'
import { router } from '@/router'
import { HexagonService, StoreService } from '@/services'
import scss from './index.module.scss'

const setHexagonLayerReactivePropsHandler = (evt: Event): void => {
  evt.stopPropagation()
  const { target } = evt as any
  const hexagonService: HexagonService = Container.get(HexagonService)
  const storeService: StoreService = Container.get(StoreService)
  target && storeService.setHexagonLayerReactivePropsState(target)
  target && hexagonService.renderHexagonLayer()
}
const resetHexagonLayerReactivePropsHandler = (evt: Event): void => {
  evt.stopPropagation()
  const hexagonService: HexagonService = Container.get(HexagonService)
  hexagonService.resetHexagonLayerReactiveProps()
}
const returnToTrailsHandler = (evt: Event): void => {
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
    setHexagonLayerReactiveProps={setHexagonLayerReactivePropsHandler}
    resetHexagonLayerReactiveProps={resetHexagonLayerReactivePropsHandler}
    returnToTrails={returnToTrailsHandler}
  />
)

export default defineComponent({
  setup() {
    const storeService: StoreService = Container.get(StoreService)
    const reactiveProps: ComputedRef<IHexagonLayerReactiveProps> = computed(
      (): IHexagonLayerReactiveProps => storeService.getHexagonLayerReactivePropsState()
    )
    return (): JSX.Element => html(reactiveProps.value)
  }
})
