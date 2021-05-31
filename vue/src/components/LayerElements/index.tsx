import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons } from '@/config'
import { StoreStates } from '@/enums'
import { ILayerElements, ILayerIcon } from '@/interfaces'
import { LayerElementService, StoreService } from '@/services'
import scss from './index.module.scss'

const onDisplayLayerElementClickHandler = (evt: Event): void => {
  evt.stopPropagation()
  const { target }: Record<string, any> = evt
  const layerElementService = Container.get(LayerElementService)
  target && layerElementService.displayLayerElement(target)
}
const html = (layerElements: ILayerElements): JSX.Element => (
  <div>
    <ul class={scss.elements}>
      {Object.values(layerElements).map((el: ILayerElements) => (
        <LayerElement
          active={el.active}
          click={onDisplayLayerElementClickHandler}
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
          click={onDisplayLayerElementClickHandler}
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
    const { LAYER_ELEMENTS } = StoreStates
    const storeService = Container.get(StoreService)
    const layerElements = computed((): ILayerElements => storeService.getState(LAYER_ELEMENTS))
    return (): JSX.Element => html(layerElements.value)
  }
})
