import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons } from '@/config'
import { ILayerElement, ILayerIcon } from '@/interfaces'
import { LayerElementService } from '@/services'
import scss from './index.module.scss'

const onDisplayLayerElementClickHandler = (evt: Event): void => {
  evt.stopPropagation()
  /* prettier-ignore */
  const { target: { id: layerElement } }: Record<string, any> = evt
  const layerElementService = Container.get(LayerElementService)
  layerElement && layerElementService.displayLayerElement(layerElement)
}
const html = (layerElements: ILayerElement[]): JSX.Element => (
  <div>
    <ul class={scss.elements}>
      {layerElements.map((el: ILayerElement) => (
        <LayerElement
          click={onDisplayLayerElementClickHandler}
          id={el.id}
          isActive={el.isActive}
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
    const layerElementService = Container.get(LayerElementService)
    const layerElements = computed((): ILayerElement[] => layerElementService.state)
    return (): JSX.Element => html(layerElements.value)
  }
})
