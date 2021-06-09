import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { Deckgl, Footer, Hexagon, Modal } from '@/components'
import { deckgl } from '@/config'
import { IDeckglOptions, IModal } from '@/interfaces'
import { ModalService } from '@/services'

const html = (modal: IModal, { canvas, container }: IDeckglOptions): JSX.Element => (
  <div>
    <Deckgl canvas={canvas} container={container} />
    <Modal isActive={modal.isActive} />
    <Hexagon />
    <Footer />
  </div>
)

export default defineComponent({
  setup() {
    const { options: deckglOptions } = deckgl
    const modalService = Container.get(ModalService)
    const modal = computed((): IModal => modalService.state)
    modalService.showModal()
    return (): JSX.Element => html(modal.value, deckglOptions)
  }
})
