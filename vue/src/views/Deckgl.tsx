import { computed, ComputedRef, defineComponent } from 'vue'

import { Deckgl, Hexagon, Modal } from '@/components'
import { IModal } from '@/interfaces'
import { store } from '@/store'

const html = (modal: IModal): JSX.Element => (
  <div>
    <Deckgl />
    <Modal class={modal.class} />
    <Hexagon />
  </div>
)

export default defineComponent({
  setup() {
    const modal: ComputedRef<IModal> = computed((): IModal => store.getters.getModalState())
    !modal.value.show && store.setters.setModalState()
    return (): JSX.Element => html(modal.value)
  }
})
