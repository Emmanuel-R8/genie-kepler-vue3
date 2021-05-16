import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { Routes } from '@/enums'
import { IHexagonParams } from '@/interfaces'
import { HexagonService } from '@/services'
import { router } from '@/router'
import { store } from '@/store'
import scss from './index.module.scss'

const onChangeInputValueHandler = (evt: Event) => {
  evt.stopPropagation()
  const { target } = evt
  const hexagonService: HexagonService = Container.get(HexagonService)
  target && hexagonService.setHexagonParams(target as HTMLInputElement)
}
const resetHexagonParamsHandler = (evt: Event): void => {
  evt.stopPropagation()
  const hexagonService: HexagonService = Container.get(HexagonService)
  hexagonService.resetHexagonParams()
}
const resetHexagonSettingsHandler = (evt: Event): void => {
  evt.stopPropagation()
  const hexagonService: HexagonService = Container.get(HexagonService)
  hexagonService.resetHexagonSettings()
}
const returnToTrailsHandler = (evt: Event): void => {
  evt.stopPropagation()
  const name: string = Routes.MAPBOX
  router.push({ name })
}
const html = (params: IHexagonParams): JSX.Element => (
  <HexagonUI
    class={scss.hexagon}
    coverage={params.coverage}
    elevationScale={params.elevationScale}
    radius={params.radius}
    upperPercentile={params.upperPercentile}
    onChangeInputValue={onChangeInputValueHandler}
    resetHexagonParams={resetHexagonParamsHandler}
    resetHexagonSettings={resetHexagonSettingsHandler}
    returnToTrails={returnToTrailsHandler}
  />
)

export default defineComponent({
  setup() {
    const params: ComputedRef<IHexagonParams> = computed(
      (): IHexagonParams => store.getters.getHexagonParamsState()
    )
    return (): JSX.Element => html(params.value)
  }
})
