import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { LayerElements, Mapbox, Modal, Trails } from '@/components'
import { mapbox } from '@/config'
import { IMapboxOptions, IModal } from '@/interfaces'
import { ModalService } from '@/services'

const showModal = (): void => {
  const modalService = Container.get(ModalService)
  modalService.showModal()
}
const html = ({ isActive }: IModal, { container }: IMapboxOptions): JSX.Element => (
  <div>
    <Mapbox container={container} />
    <Modal isActive={isActive} />
    <LayerElements />
    <Trails />
  </div>
)

export default defineComponent({
  setup() {
    const { options } = mapbox
    const modalService = Container.get(ModalService)
    const state = computed((): IModal => modalService.state)
    showModal()
    return (): JSX.Element => html(state.value, options)
  }
})
