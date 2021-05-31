import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted, PropType } from 'vue'

import { MapService, MapboxService } from '@/services'
import scss from './index.module.scss'

export default defineComponent({
  props: {
    container: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props: Record<string, string>) {
    const mapService = Container.get(MapService)
    const mapboxService = Container.get(MapboxService)
    onMounted((): void => {
      mapService.loadMapLayer()
    })
    onUnmounted((): void => {
      mapService.map.off('click', mapService.onMapClickHandler)
      mapService.map.off('load', mapService.onMapLoadHandler)
      mapService.map.off('mouseenter', mapService.onMapMouseEnterHandler)
      mapService.map.off('mouseleave', mapService.onMapMouseLeaveHandler)
      mapboxService.map.off('idle', mapboxService.onMapIdleHandler)
      mapboxService.map.off('load', mapboxService.onMapLoadHandler)
    })
    return (): JSX.Element => <div id={props.container} class={scss[props.container]}></div>
  }
})
