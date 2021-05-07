import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent, onUnmounted } from 'vue'

import { Modal, Layers, Trails } from '@/components'
import { IModal } from '@/interfaces'
import { AppService, MapService, MapboxService, PopupService } from '@/services'
import store from '@/store'
import scss from './index.module.scss'

const appService: AppService = Container.get(AppService)
const mapService: MapService = Container.get(MapService)
const mapboxService: MapboxService = Container.get(MapboxService)
const popupService: PopupService = Container.get(PopupService)

const modal: ComputedRef<IModal> = computed(() => store.getters.getModalState())
const setModalState = (): void => {
  store.setters.setModalState()
}
const html = (): JSX.Element => (
  <div id="mapbox" class={scss.mapbox}>
    {<Modal class={modal.value.class} />}
    {modal.value.show && <Layers />}
    {modal.value.show && <Trails />}
  </div>
)

export default defineComponent({
  setup() {
    onUnmounted(() => {
      mapService.map.off('click', popupService.addLayerPopup)
      mapService.map.off('load', mapService.addLayers)
      mapService.map.off('mouseenter', mapService.map.getCanvas)
      mapService.map.off('mouseleave', popupService.removePopup)
      mapboxService.map.off('idle', mapboxService.setMapboxSettings)
    })
    appService.loadMap()
    setTimeout((): void => setModalState(), 3000)
    return (): JSX.Element => html()
  }
})
