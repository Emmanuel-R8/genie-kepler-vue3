import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { layerIcons } from '@/config'
import { ILayerElement } from '@/interfaces'
import { LayerElementService } from '@/services'
import { elements, icons } from './index.module.scss'

export default defineComponent({
  setup() {
    const layerElementService = Container.get(LayerElementService)
    const state = computed((): ILayerElement[] => layerElementService.state)
    return (): JSX.Element => html(state.value)
  }
})

const html = (layerElements: ILayerElement[]): JSX.Element => (
  <div>
    <ul class={elements}>
      {layerElements.map(({ id, isActive, name }) => (
        <LayerElement
          click={onDisplayLayerElementClickHandler}
          id={id}
          isActive={isActive}
          key={id}
          name={name}
        />
      ))}
    </ul>
    <ul class={icons}>
      {layerIcons.map(({ height, id, name, src, width }) => (
        <LayerIcon
          alt={name}
          click={onDisplayLayerElementClickHandler}
          height={height}
          id={id}
          key={id}
          src={src}
          width={width}
        />
      ))}
    </ul>
  </div>
)
const onDisplayLayerElementClickHandler = (evt: Event): void => {
  evt.stopPropagation()
  /* prettier-ignore */
  const { target: { id } }: Record<string, any> = evt
  const layerElementService = Container.get(LayerElementService)
  id && layerElementService.displayLayerElement(id)
}
