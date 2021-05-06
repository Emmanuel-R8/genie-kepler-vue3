import { Container } from 'typedi'
import { defineComponent, reactive } from 'vue'

import { Modal, Layers, Trails } from '@/components'
import { AppService } from '@/services'
import scss from './index.module.scss'

const appService: AppService = Container.get(AppService)
const state: Record<string, any> = reactive({
  modal: 'active',
  show: false
})
// const getState = (): Record<string, any> => state
const setState = (): void => {
  state.modal = 'inactive'
  state.show = !state.show
}
const html = (): JSX.Element => (
  <div id="mapbox" class={scss.mapbox}>
    {<Modal class={state.modal} />}
    {state.show && <Layers />}
    {state.show && <Trails />}
  </div>
)

export default defineComponent({
  setup() {
    appService.loadMap()
    setTimeout((): void => setState(), 2100)
    return () => html()
  }
})
