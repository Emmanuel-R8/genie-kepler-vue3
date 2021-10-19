import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { Deckgl, Footer, Hexagon, Modal } from '@/components'
import { deckgl } from '@/config'
import { IModal } from '@/interfaces'
import { ModalService } from '@/services'

export default defineComponent({
  setup() {
    /* prettier-ignore */
    const { options: { canvas, container } } = deckgl
    const modalState = getModalState()
    return (): JSX.Element => html(modalState.value, canvas, container)
  }
})

const html = ({ isActive }: IModal, canvas: string, container: string): JSX.Element => (
  <>
    <Deckgl canvas={canvas} container={container} />
    <Modal isActive={isActive} />
    <Hexagon />
    <Footer />
  </>
)

const getModalState = (): ComputedRef<IModal> => {
  const modalService = Container.get(ModalService)
  return computed((): IModal => modalService.state)
}
