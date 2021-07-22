import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { Deckgl, Footer, Hexagon, Modal } from '@/components'
import { deckgl } from '@/config'
import { IModal } from '@/interfaces'
import { ModalService } from '@/services'

export default defineComponent({
  setup() {
    /* prettier-ignore */
    const { options: { canvas, container } } = deckgl
    const modalService = Container.get(ModalService)
    const state = computed((): IModal => modalService.state)
    return (): JSX.Element => html(state.value, canvas, container)
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
