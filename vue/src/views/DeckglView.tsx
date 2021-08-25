import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { DeckglVue, FooterVue, HexagonVue, ModalVue } from '@/components'
import { deckgl_Config } from '../components/Deckgl/config'
import { IModal } from '../components/Modal/interfaces'
import { Modal_Service } from '../components/Modal/services'

export default defineComponent({
    setup() {
        /* prettier-ignore */
        const { options: { canvas, container } } = deckgl_Config
        const modalState = getModalState()
        return (): JSX.Element => html(modalState.value, canvas, container)
    }
})

const html = ({ isActive }: IModal, canvas: string, container: string): JSX.Element => (
    <>
        <DeckglVue canvas={canvas} container={container} />
        <ModalVue isActive={isActive} />
        <HexagonVue />
        <FooterVue />
    </>
)

const getModalState = (): ComputedRef<IModal> => {
    const modalService = Container.get(Modal_Service)
    return computed((): IModal => modalService.state)
}
