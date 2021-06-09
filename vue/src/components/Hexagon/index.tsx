import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { Routes } from '@/enums'
import { router } from '@/router'
import { HexagonLayerService } from '@/services'
import scss from './index.module.scss'

const onSetHexagonLayerReactivePropsHandler = (evt: Event): void => {
  evt.stopPropagation()
  /* prettier-ignore */
  const { target: { id: prop, value } }: Record<string, any> = evt
  const hexagonLayerService = Container.get(HexagonLayerService)
  hexagonLayerService.state = { prop, value }
  hexagonLayerService.renderHexagonLayer()
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
const html = (reactiveProps: Record<string, any>): JSX.Element => (
  <HexagonUI
    class={scss.hexagon}
    coverage={reactiveProps.coverage}
    elevationScale={reactiveProps.elevationScale}
    radius={reactiveProps.radius}
    upperPercentile={reactiveProps.upperPercentile}
    setHexagonLayerReactiveProps={onSetHexagonLayerReactivePropsHandler}
    resetHexagonLayerReactiveProps={onResetHexagonLayerReactivePropsHandler}
    returnToTrails={onReturnToTrailsHandler}
  />
)

export default defineComponent({
  setup() {
    const hexagonLayerService = Container.get(HexagonLayerService)
    const reactiveProps = computed((): Record<string, any> => hexagonLayerService.state)
    return (): JSX.Element => html(reactiveProps.value)
  }
})
