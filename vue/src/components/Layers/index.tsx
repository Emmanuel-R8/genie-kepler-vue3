import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent, onMounted } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { LayerElements } from '@/interfaces'
import { layer_elements, layerIcons } from '@/config'
import { StoreActions } from '@/enums'
import router from '@/router'
import { MapService, MarkerService } from '@/services'
import store from '@/store'

import scss from './index.module.scss'

type Layer = 'biosphere' | 'charts' | 'deckgl' | 'office' | 'places' | 'satellite' | 'trails'

const displayLayer = (layer: Layer): void => {
  const mapService: MapService = Container.get(MapService)
  const markerService: MarkerService = Container.get(MarkerService)

  switch (layer) {
    case 'satellite':
      /* hide visible markers when changing map styles for aesthetic purposes */
      markerService.showMarkers()
      /* toggle between 'outdoors' and 'satellite' map styles (basemaps) */
      store.dispatch(`layerElements/${StoreActions.SET_LAYER_ELEMENTS}`, setActive(layer))
      store.dispatch(`mapStyles/${StoreActions.SET_MAP_STYLES}`)
      mapService.setMapStyle()
      /* show hidden markers when changing map styles for aesthetic purposes */
      setTimeout((): void => markerService.showMarkers(), 1200)
      break
    case 'biosphere':
    case 'trails':
      // updateLayerElementsState(layer)
      // store.dispatch(`layerElements/${StoreActions.SET_LAYER_ELEMENTS}`, setActive(layer))
      store.dispatch(`layers/${StoreActions.SET_LAYERS_VISIBILITY}`, layer)
      mapService.setLayerVisibility(layer)

      if (layer === 'biosphere') {
        mapService.setLayerVisibility('biosphere-border')
      }
      if (layer === 'trails') {
        // store.dispatch(`markers/${StoreActions.SET_MARKERS_VISIBILITY}`, layer)
        markerService.toggleMarkers(layer)
      }
      break
    case 'office':
    case 'places':
      store.dispatch(`layerElements/${StoreActions.SET_LAYER_ELEMENTS}`, setActive(layer))
      // store.dispatch(`markers/${StoreActions.SET_MARKERS_VISIBILITY}`, layer)
      markerService.toggleMarkers(layer)
      break
    case 'deckgl':
      router.push('deckgl')
      break
    case 'charts':
      router.push('charts')
      break
  }
}

// const updateLayerElementsState = (layer: Layer): void => {
//   const layerElements = [...layerElementsState]

//   layerElements[layerElementsHash[id]].active = !layerElements[layerElementsHash[id]].active
//   layerElements[layerElementsHash[id]].active
//     ? (layerElements[layerElementsHash[id]].class = 'active')
//     : (layerElements[layerElementsHash[id]].class = '')

//   setLayerElementsState(layerElements)
// }

const setActive = (layer: Layer): number => {
  return 1
}

const onDisplayLayerHandler = (evt: any): void => {
  if (evt?.target?.id) {
    /* prettier-ignore */
    const { target: { id } } = evt
    const layer: Layer = id.split('-')[0]
    displayLayer(layer)
  }
}

export default defineComponent({
  setup() {
    // onMounted(() => {
    //   const state: ComputedRef<any> = computed(
    //     () => store.getters['layerElements/getLayerElements']
    //   )
    //   layerElements = state.value.layerElements
    //   return layerElements
    // })
    return () => (
      <>
        <ul class={scss.elements}>
          {layer_elements.map((el: any) => (
            <LayerElement
              class={scss[el.class]}
              click={onDisplayLayerHandler}
              id={el.id}
              key={el.id}
              name={el.name}
            />
          ))}
        </ul>
        <ul class={scss.icons}>
          {layerIcons.map((icon: any) => (
            <LayerIcon
              alt={icon.name}
              class={scss[icon.id]}
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
