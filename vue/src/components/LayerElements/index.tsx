import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons } from '@/config'
import { ILayerElement, ILayerIcon } from '@/interfaces'
import { LayerElementsService, StoreService } from '@/services'
import scss from './index.module.scss'

const onDisplayLayerHandler = (evt: any): void => {
  evt.stopPropagation()
  const layerElementsService: LayerElementsService = Container.get(LayerElementsService)
  evt?.target?.id && layerElementsService.displayLayerElements(evt.target.id.split('-')[0])
}
const html = (layerElements: ILayerElement[]): JSX.Element => (
  <div>
    <ul class={scss.elements}>
      {layerElements.map((el: ILayerElement) => (
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
    const layerElements: ComputedRef<ILayerElement[]> = computed((): ILayerElement[] =>
      storeService.getLayerElementsState()
    )
    return (): JSX.Element => html(layerElements.value)
  }
})
