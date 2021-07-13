import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { Deckgl, Footer, Hexagon, Modal } from '@/components'
import { deckgl } from '@/config'
import { IDeckglOptions, IModal } from '@/interfaces'
import { ModalService } from '@/services'

const html = ({ isActive }: IModal, { canvas, container }: IDeckglOptions): JSX.Element => (
  <>
    <Deckgl canvas={canvas} container={container} />
    <Modal isActive={isActive} />
    <Hexagon />
    <Footer />
  </>
)

export default defineComponent({
  setup() {
    const { options } = deckgl
    const modalService = Container.get(ModalService)
    const state = computed((): IModal => modalService.state)
    modalService.showModal()
    return (): JSX.Element => html(state.value, options)
  }
})
