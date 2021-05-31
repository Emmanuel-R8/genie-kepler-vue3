import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { LayerElements, Mapbox, Modal, Trails } from '@/components'
import { mapbox } from '@/config'
import { IMapboxOptions, IModal } from '@/interfaces'
import { ModalService } from '@/services'

const html = (modal: IModal, { container }: IMapboxOptions): JSX.Element => (
  <div>
    <Mapbox container={container} />
    <Modal class={modal.class} />
    <LayerElements />
    <Trails />
  </div>
)

export default defineComponent({
  setup() {
    const { options: mapboxOptions } = mapbox
    const modalService = Container.get(ModalService)
    const modal = computed((): IModal => modalService.modalState)
    modalService.showModal()
    return (): JSX.Element => html(modal.value, mapboxOptions)
  }
})
