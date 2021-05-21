import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted, PropType } from 'vue'

import { MapService, MapboxService, PopupService } from '@/services'
import scss from './index.module.scss'

export default defineComponent({
  props: {
    container: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props: Record<string, string>) {
    const mapService: MapService = Container.get(MapService)
    const mapboxService: MapboxService = Container.get(MapboxService)
    const popupService: PopupService = Container.get(PopupService)
    onMounted((): void => {
      mapService.loadMapLayer()
    })
    onUnmounted((): void => {
      mapService.map.off('click', popupService.addLayerPopup)
      mapService.map.off('load', mapService.addLayers)
      mapService.map.off('mouseenter', mapService.map.getCanvas)
      mapService.map.off('mouseleave', popupService.removePopup)
      mapboxService.map.off('idle', mapboxService.setMapboxSettings)
    })
    return (): JSX.Element => <div id={props.container} class={scss[props.container]}></div>
  }
})
