import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted } from 'vue'

import { MapService, MapboxService } from '@/services'
import { MapboxProps } from '@/types'
import scss from './index.module.scss'

const html = ({ container }: MapboxProps): JSX.Element => (
  <div id={container} class={scss[container]}></div>
)

export default defineComponent({
  props: {
    container: {
      type: String,
      required: true
    }
  },
  setup(props: MapboxProps) {
    onMounted(async (): Promise<void> => {
      const mapService = Container.get(MapService)
      await mapService.loadMapLayer()
    })
    onUnmounted((): void => {
      const mapService = Container.get(MapService)
      const mapboxService = Container.get(MapboxService)
      /* eslint-disable @typescript-eslint/unbound-method */
      mapboxService.map.off('click', mapService.onMapClickHandler)
      mapboxService.map.off('load', mapService.onMapLoadHandler)
      mapboxService.map.off('mouseenter', mapService.onMapMouseEnterHandler)
      mapboxService.map.off('mouseleave', mapService.onMapMouseLeaveHandler)
      mapboxService.map.off('idle', mapboxService.onMapIdleHandler)
      mapboxService.map.off('load', mapboxService.onMapLoadHandler)
    })
    return (): JSX.Element => html(props)
  }
})
