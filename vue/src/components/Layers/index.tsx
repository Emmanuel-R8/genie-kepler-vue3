import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent, watchEffect } from 'vue'
import { Store, useStore } from 'vuex'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons } from '@/config'
import { StoreActions } from '@/enums'
import { MapService, MarkerService } from '@/services'
// import router from '@/router'
import store from '@/store'
import scss from './index.module.scss'

type Layer = 'biosphere' | 'charts' | 'deckgl' | 'office' | 'places' | 'satellite' | 'trails'

const mapService: MapService = Container.get(MapService)
const markerService: MarkerService = Container.get(MarkerService)

const displayLayer = (layer: Layer): void => {
  switch (layer) {
    case 'satellite':
      /* hide visible markers when changing map styles for aesthetic purposes */
      markerService.showMarkers()
      /* toggle between 'outdoors' and 'satellite' map styles (basemaps) */
      store.dispatch(`mapStyles/${StoreActions.SET_MAP_STYLES}`)
      mapService.setMapStyle()
      /* show hidden markers when changing map styles for aesthetic purposes */
      setTimeout((): void => markerService.showMarkers(), 1200)
      break
    case 'biosphere':
    case 'trails':
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
      markerService.toggleMarkers(layer)
      break
    case 'deckgl':
      // router.push('deckgl')
      break
    case 'charts':
      // router.push('charts')
      break
  }
  store.dispatch(`layerElements/${StoreActions.SET_LAYER_ELEMENTS}`, layer)
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

export default defineComponent({
  setup() {
    const store: Store<any> = useStore()
    const layerElements: ComputedRef<any> = computed(
      () => store.getters['layerElements/getLayerElements']
    )

    watchEffect(() => {
      console.log(layerElements.value)
    })
    return () => (
      <>
        <ul class={scss.elements}>
          {layerElements.value.map((el: Record<string, any>) => (
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
  }
})
