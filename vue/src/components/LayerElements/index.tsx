import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons } from '@/config'
import { ILayerElements, ILayerIcon } from '@/interfaces'
import { LayerElementService, StoreService } from '@/services'
import scss from './index.module.scss'

const onDisplayLayerHandler = (evt: Event): void => {
  evt.stopPropagation()
  /* prettier-ignore */
  const { target: { id: layer } } = evt as any
  const layerElementService: LayerElementService = Container.get(LayerElementService)
  layer && layerElementService.displayLayerElements(layer.split('-')[0])
}
const html = (layerElements: ILayerElements[]): JSX.Element => (
  <div>
    <ul class={scss.elements}>
      {layerElements.map((el: ILayerElements) => (
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
      {layerIcons.map((icon: ILayerIcon) => (
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
    const storeService: StoreService = Container.get(StoreService)
    const layerElements: ComputedRef<ILayerElements[]> = computed((): ILayerElements[] =>
      storeService.getLayerElementsState()
    )
    return (): JSX.Element => html(layerElements.value)
  }
})
