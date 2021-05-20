import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { Routes } from '@/enums'
import { IHexagonLayerDynamicProps } from '@/interfaces'
import { router } from '@/router'
import { HexagonService, StoreService } from '@/services'
import scss from './index.module.scss'

const setHexagonLayerPropsHandler = (evt: Event): void => {
  evt.stopPropagation()
  /* prettier-ignore */
  const { target: { id: prop, value } } = evt as any
  const hexagonService: HexagonService = Container.get(HexagonService)
  const storeService: StoreService = Container.get(StoreService)
  storeService.setHexagonLayerPropsState(prop, +value)
  hexagonService.renderHexagonLayer()
}
const resetHexagonLayerPropsHandler = (evt: Event): void => {
  evt.stopPropagation()
  const hexagonService: HexagonService = Container.get(HexagonService)
  hexagonService.resetHexagonLayerProps()
}
const returnToTrailsHandler = (evt: Event): void => {
  evt.stopPropagation()
  const name: string = Routes.MAPBOX
  router.push({ name })
}
const html = (props: IHexagonLayerDynamicProps): JSX.Element => (
  <HexagonUI
    class={scss.hexagon}
    coverage={props.coverage}
    elevationScale={props.elevationScale}
    radius={props.radius}
    upperPercentile={props.upperPercentile}
    setHexagonLayerProps={setHexagonLayerPropsHandler}
    resetHexagonLayerProps={resetHexagonLayerPropsHandler}
    returnToTrails={returnToTrailsHandler}
  />
)

export default defineComponent({
  setup() {
    const storeService: StoreService = Container.get(StoreService)
    const dynamicProps: ComputedRef<IHexagonLayerDynamicProps> = computed(
      (): IHexagonLayerDynamicProps => storeService.getHexagonLayerPropsState()
    )
    return (): JSX.Element => html(dynamicProps.value)
  }
})
