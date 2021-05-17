import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { Deckgl, Hexagon, Modal } from '@/components'
import { IModal } from '@/interfaces'
import { ModalService } from '@/services'
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
    const modalService: ModalService = Container.get(ModalService)
    modalService.showModal()
    return (): JSX.Element => html(modal.value)
  }
})
