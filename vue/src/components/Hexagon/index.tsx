import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { HexagonUI } from '@/components'
import { IHexagonParams } from '@/interfaces'
import { HexagonService } from '@/services'
import { router } from '@/router'
import { store } from '@/store'
import scss from './index.module.scss'

const hexagonService: HexagonService = Container.get(HexagonService)
// const onChangeInputValueHandler = (evt: any) => {
//   evt.stopPropagation()
//   hexagonService.setHexagonParams(evt)
// }
// const resetHexagonParamsHandler = (evt: any): void => {
//   evt.stopPropagation()
//   hexagonService.resetHexagonParams()
// }
const resetHexagonSettingsHandler = (evt: any): void => {
  evt.stopPropagation()
  hexagonService.resetHexagonSettings()
}
const returnToTrailsHandler = (evt: any): any => {
  evt.stopPropagation()
  store.setters.setModalState()
  router.push('mapbox')
}

const html = (params: IHexagonParams): JSX.Element => (
  <HexagonUI
    class={scss.hexagon}
    coverage={params.coverage}
    elevationScale={params.elevationScale}
    radius={params.radius}
    upperPercentile={params.upperPercentile}
    // onChangeInputValue={onChangeInputValueHandler}
    // resetHexagonParams={resetHexagonParamsHandler}
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
