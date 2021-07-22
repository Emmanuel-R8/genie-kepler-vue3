import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { LayerElements, Mapbox, Modal, Trails } from '@/components'
import { mapbox } from '@/config'
import { IModal } from '@/interfaces'
import { ModalService } from '@/services'

export default defineComponent({
  setup() {
    /* prettier-ignore */
    const { options: { container } } = mapbox
    const modalService = Container.get(ModalService)
    const state = computed((): IModal => modalService.state)
    return (): JSX.Element => html(state.value, container)
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
