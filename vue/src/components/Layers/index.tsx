import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons } from '@/config'
import { StoreActions } from '@/enums'
import { MapService, MarkerService } from '@/services'
import router from '@/router'
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
      store.dispatch(`layerElements/${StoreActions.SET_LAYER_ELEMENTS}`, layer)
      store.dispatch(`mapStyles/${StoreActions.SET_MAP_STYLES}`)
      mapService.setMapStyle()
      /* show hidden markers when changing map styles for aesthetic purposes */
      setTimeout((): void => markerService.showMarkers(), 1200)
      break
    case 'biosphere':
    case 'trails':
      store.dispatch(`layerElements/${StoreActions.SET_LAYER_ELEMENTS}`, layer)
      store.dispatch(`styleLayers/${StoreActions.SET_STYLE_LAYERS_VISIBILITY}`, layer)
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
      store.dispatch(`layerElements/${StoreActions.SET_LAYER_ELEMENTS}`, layer)
      markerService.toggleMarkers(layer)
      break
    case 'deckgl':
      router.push('deckgl')
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

const html = (layerElements: any[]): JSX.Element => (
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
    const layerElements: ComputedRef<any> = computed(
      () => store.getters['layerElements/getLayerElements']
    )
    return () => html(layerElements.value)
  }
})
