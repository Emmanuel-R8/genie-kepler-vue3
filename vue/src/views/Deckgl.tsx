import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { DeckglVue, FooterVue, HexagonVue, ModalVue } from '@/components'
import { deckglConfig } from '@/config'
import { IModal } from '@/interfaces'
import { ModalService } from '@/services'

export default defineComponent({
    setup() {
        /* prettier-ignore */
        const { options: { canvas, container } } = deckglConfig
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
    const modalService = Container.get(ModalService)
    return computed((): IModal => modalService.state)
}
