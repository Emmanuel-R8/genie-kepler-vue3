import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent, reactive, toRefs, watchEffect } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layer_elements, layer_icons } from '@/config'
import { StoreActions } from '@/enums'
import { MapService, MarkerService } from '@/services'
import router from '@/router'
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
    case 'charts':
      router.push('charts')
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

export default defineComponent({
  setup() {
    const layerElements: ComputedRef<any> = computed(
      () => store.getters['layerElements/getLayerElements']
    )

    // const layerElements: any = { ...toRefs(reactive(store.getters['layerElements/getState'])) }
    // Object.values(layerElements).map((el: any) => {
    //   console.log(el.value.active, el.value.id, el.value.name)
    // })

    watchEffect(() => {
      console.log(layerElements)
    })
    return () => (
      <>
        <ul class={scss.elements}>
          {/* {Object.values(layerElements).map((el: any) => ( */}
          {layer_elements.map((el: any, i: number) => (
            <LayerElement
              active={layerElements.value[i].active}
              click={onDisplayLayerHandler}
              id={el.id}
              key={el.id}
              name={el.name}
            />
          ))}
        </ul>
        <ul class={scss.icons}>
          {layer_icons.map((icon: Record<string, any>) => (
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
