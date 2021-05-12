import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mapbox } from '@/config'
import { MapService, MapboxService, PopupService } from '@/services'
import scss from './index.module.scss'

const mapService: MapService = Container.get(MapService)
const mapboxService: MapboxService = Container.get(MapboxService)
const popupService: PopupService = Container.get(PopupService)

export default defineComponent({
  setup() {
    /* prettier-ignore */
    const { mapOptions: { container } } = mapbox
    onMounted((): void => {
      mapService.loadMap()
    })
    onUnmounted((): void => {
      mapService.map.off('click', popupService.addLayerPopup)
      mapService.map.off('load', mapService.addLayers)
      mapService.map.off('mouseenter', mapService.map.getCanvas)
      mapService.map.off('mouseleave', popupService.removePopup)
      mapboxService.map.off('idle', mapboxService.setMapSettings)
    })
    return (): JSX.Element => <div id={container} class={scss.mapbox}></div>
  }
})
