import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { Routes } from '@/enums'
import { IHexagonAttributes } from '@/interfaces'
import { router } from '@/router'
import { HexagonService, StoreService } from '@/services'
import scss from './index.module.scss'

const onChangeInputValueHandler = (evt: Event): void => {
  evt.stopPropagation()
  const { target } = evt
  const hexagonService: HexagonService = Container.get(HexagonService)
  target && hexagonService.setHexagonAttributes(target as HTMLInputElement)
}
const resetHexagonAttributesHandler = (evt: Event): void => {
  evt.stopPropagation()
  const hexagonService: HexagonService = Container.get(HexagonService)
  hexagonService.resetHexagonAttributes()
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
const html = (attributes: IHexagonAttributes): JSX.Element => (
  <HexagonUI
    class={scss.hexagon}
    coverage={attributes.coverage}
    elevationScale={attributes.elevationScale}
    radius={attributes.radius}
    upperPercentile={attributes.upperPercentile}
    onChangeInputValue={onChangeInputValueHandler}
    resetHexagonAttributes={resetHexagonAttributesHandler}
    resetHexagonSettings={resetHexagonSettingsHandler}
    returnToTrails={returnToTrailsHandler}
  />
)

export default defineComponent({
  setup() {
    const storeService: StoreService = Container.get(StoreService)
    const attributes: ComputedRef<IHexagonAttributes> = computed(
      (): IHexagonAttributes => storeService.getHexagonAttributesState()
    )
    return (): JSX.Element => html(attributes.value)
  }
})
