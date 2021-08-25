import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { LayerElementsVue, MapboxVue, ModalVue, TrailsVue } from '@/components'
import { mapbox_Config } from '../components/Mapbox/config'
import { IModal } from '../components/Modal/interfaces'
import { Modal_Service } from '../components/Modal/services'

export default defineComponent({
    setup() {
        /* prettier-ignore */
        const { options: { container } } = mapbox_Config
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
    const modalService = Container.get(Modal_Service)
    return computed((): IModal => modalService.state)
}
