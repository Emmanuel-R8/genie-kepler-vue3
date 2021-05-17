import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { LayerElements, Mapbox, Modal, Trails } from '@/components'
import { IModal } from '@/interfaces'
import { ModalService } from '@/services'

const html = (modal: IModal): JSX.Element => (
  <div>
    <Mapbox />
    <Modal class={modal.class} />
    <LayerElements />
    <Trails />
  </div>
)

export default defineComponent({
  setup() {
    const modalService: ModalService = Container.get(ModalService)
    const modal: ComputedRef<IModal> = computed((): IModal => modalService.getModalState())
    modalService.showModal()
    return (): JSX.Element => html(modal.value)
  }
})
