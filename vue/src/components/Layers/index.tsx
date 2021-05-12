import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons } from '@/config'
import { ILayer, ILayerElement } from '@/interfaces'
import { MapService, MarkerService } from '@/services'
import { router } from '@/router'
import { store } from '@/store'
import scss from './index.module.scss'

const mapService: MapService = Container.get(MapService)
const markerService: MarkerService = Container.get(MarkerService)

const displayLayer = (layer: ILayer): void => {
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
      mapService.setStyleLayerVisibility(layer as string)

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
      store.setters.setModalState()
      router.push('deckgl')
      break
  }
}

const onDisplayLayerHandler = (evt: any): void => {
  evt.stopPropagation()
  evt?.target?.id && displayLayer(evt.target.id.split('-')[0])
}

const html = (layerElements: ILayerElement[]): JSX.Element => (
  <div>
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
  </div>
)

export default defineComponent({
  setup() {
    const layerElements: ComputedRef<ILayerElement[]> = computed((): ILayerElement[] =>
      store.getters.getLayerElementsState()
    )
    return (): JSX.Element => html(layerElements.value)
  }
})
