import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons } from '@/config'
import { ILayerElement } from '@/interfaces'
import { MapService, MarkerService } from '@/services'
// import router from '@/router'
import store from '@/store'
import scss from './index.module.scss'

type Layer = 'biosphere' | 'deckgl' | 'office' | 'places' | 'satellite' | 'trails'

const mapService: MapService = Container.get(MapService)
const markerService: MarkerService = Container.get(MarkerService)

const displayLayer = (layer: Layer): void => {
  switch (layer) {
    case 'satellite':
      /* hide visible markers when changing map styles for aesthetic purposes */
      markerService.showMarkers()
      /* toggle between 'outdoors' and 'satellite' map styles (basemaps) */
      store.setters.setLayerElementsState(layer)
      store.setters.setMapStylesState()
      mapService.setMapStyle()
      /* show hidden markers when changing map styles for aesthetic purposes */
      setTimeout((): void => markerService.showMarkers(), 1200)
      break
    case 'biosphere':
    case 'trails':
      store.setters.setLayerElementsState(layer)
      store.setters.setStyleLayersVisibilityState(layer)
      mapService.setStyleLayerVisibility(layer)

      if (layer === 'biosphere') {
        mapService.setStyleLayerVisibility('biosphere-border')
      }
      if (layer === 'trails') {
        markerService.toggleMarkers(layer)
      }
      break
    case 'office':
    case 'places':
      store.setters.setLayerElementsState(layer)
      markerService.toggleMarkers(layer)
      break
    case 'deckgl':
      // router.push('deckgl')
      break
  }
}

const onDisplayLayerHandler = (evt: any): void => {
  evt.stopPropagation()
  /* prettier-ignore */
  if (evt?.target?.id) {
    const { target: { id } } = evt
    const layer: Layer = id.split('-')[0]
    displayLayer(layer)
  }
}

const html = (layerElements: ILayerElement[]): JSX.Element => (
  <>
    <ul class={scss.elements}>
      {layerElements.map((el: Record<string, any>) => (
        <LayerElement
          active={el.active}
          click={onDisplayLayerHandler}
          id={el.id}
          key={el.id}
          name={el.name}
        />
      ))}
    </ul>
    <ul class={scss.icons}>
      {layerIcons.map((icon: Record<string, any>) => (
        <LayerIcon
          alt={icon.name}
          click={onDisplayLayerHandler}
          height={icon.height}
          id={icon.id}
          key={icon.id}
          src={icon.src}
          width={icon.width}
        />
      ))}
    </ul>
  </>
)

export default defineComponent({
  setup() {
    const layerElements: ComputedRef<ILayerElement[]> = computed(() =>
      store.getters.getLayerElementsState()
    )
    return (): JSX.Element => html(layerElements.value)
  }
})
