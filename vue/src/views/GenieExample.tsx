import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { GenieExampleVue, FooterVue, HexagonVue, ModalVue } from '@/components'
import { genieExampleConfig } from '@/config'
import { IModal } from '@/interfaces'
import { ModalService } from '@/services'

export default defineComponent({
    setup() {
        /* prettier-ignore */
        const { options: { canvas, container } } = genieExampleConfig
        const modalState = getModalState()
        return (): JSX.Element => html(modalState.value, canvas, container)
    }
})

const html = ({ isActive }: IModal, canvas: string, container: string): JSX.Element => (
    <>
        <GenieExampleVue canvas={canvas} container={container} />
        <ModalVue isActive={isActive} />
        <HexagonVue />
        <FooterVue />
    </>
)

const getModalState = (): ComputedRef<IModal> => {
    const modalService = Container.get(ModalService)
    return computed((): IModal => modalService.state)
}
