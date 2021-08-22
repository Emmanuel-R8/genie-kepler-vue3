import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { LayerElementsVue, MapboxVue, ModalVue, TrailsVue } from '@/components'
import { mapboxConfig } from '@/config'
import { IModal } from '@/interfaces'
import { ModalService } from '@/services'

export default defineComponent({
    setup() {
        /* prettier-ignore */
        const { options: { container } } = mapboxConfig
        const modalState = getModalState()
        return (): JSX.Element => html(modalState.value, container)
    }
})

const html = ({ isActive }: IModal, container: string): JSX.Element => (
    <>
        <MapboxVue container={container} />
        <ModalVue isActive={isActive} />
        <LayerElementsVue />
        <TrailsVue />
    </>
)

const getModalState = (): ComputedRef<IModal> => {
    const modalService = Container.get(ModalService)
    return computed((): IModal => modalService.state)
}
