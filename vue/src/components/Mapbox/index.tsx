import { Container } from 'typedi'
import { defineComponent, onMounted, onUnmounted } from 'vue'

import { MapService, MapboxService } from '@/services'
import scss from './index.module.scss'

type Props = {
  container: string
}

const html = ({ container }: Props): JSX.Element => (
  <div id={container} class={scss[container]}></div>
)

export default defineComponent({
  props: {
    container: {
      type: String,
      required: true
    }
  },
  setup(props: Props) {
    const mapService = Container.get(MapService)
    onMounted(async (): Promise<void> => {
      await mapService.loadMapLayer()
    })
    onUnmounted((): void => {
      const mapboxService = Container.get(MapboxService)
      /* eslint-disable @typescript-eslint/unbound-method */
      mapService.map.off('click', mapService.onMapClickHandler)
      mapService.map.off('load', mapService.onMapLoadHandler)
      mapService.map.off('mouseenter', mapService.onMapMouseEnterHandler)
      mapService.map.off('mouseleave', mapService.onMapMouseLeaveHandler)
      mapboxService.map.off('idle', mapboxService.onMapIdleHandler)
      mapboxService.map.off('load', mapboxService.onMapLoadHandler)
    })
    return (): JSX.Element => html(props)
  }
})
