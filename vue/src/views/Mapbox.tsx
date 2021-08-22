import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { LayerElements, Mapbox, Modal, Trails } from '@/components'
import { mapbox } from '@/config'
import { IModal } from '@/interfaces'
import { ModalService } from '@/services'

export default defineComponent({
    setup() {
        /* prettier-ignore */
        const { options: { container } } = mapbox
        const modalState = getModalState()
        return (): JSX.Element => html(modalState.value, container)
    }
})

const html = ({ isActive }: IModal, container: string): JSX.Element => (
    <>
        <Mapbox container={container} />
        <Modal isActive={isActive} />
        <LayerElements />
        <Trails />
    </>
)

const getModalState = (): ComputedRef<IModal> => {
    const modalService = Container.get(ModalService)
    return computed((): IModal => modalService.state)
}
