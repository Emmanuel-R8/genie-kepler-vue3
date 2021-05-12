import { computed, ComputedRef, defineComponent } from 'vue'

import { Layers, Mapbox, Modal, Trails } from '@/components'
import { IModal } from '@/interfaces'
import { store } from '@/store'

const html = (modal: IModal): JSX.Element => (
  <div>
    <Mapbox />
    <Modal class={modal.class} />
    <Layers />
    <Trails />
  </div>
)

export default defineComponent({
  setup() {
    const modal: ComputedRef<IModal> = computed((): IModal => store.getters.getModalState())
    if (!modal.value.show) {
      store.setters.setModalState()
    }
    return (): JSX.Element => html(modal.value)
  }
})
