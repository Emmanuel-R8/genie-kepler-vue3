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
const setState = (state: Record<string, any>): void => {
  state.modal = 'inactive'
  state.show = !state.show
}
const html = (state: Record<string, any>): JSX.Element => (
  <div id="mapbox" class={scss.mapbox}>
    {<Modal class={state.modal} />}
    {state.show && <Layers />}
    {state.show && <Trails />}
  </div>
)

export default defineComponent({
  setup() {
    appService.loadMap()
    setTimeout((): void => setState(state), 2400)
    return () => html(state)
  }
})
