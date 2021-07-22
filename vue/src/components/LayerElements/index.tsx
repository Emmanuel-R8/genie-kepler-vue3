import { Container } from 'typedi'
import { computed, defineComponent } from 'vue'

import { LayerElement, LayerIcon } from '@/components'
import { ILayerElement } from '@/interfaces'
import { LayerElementService } from '@/services'
import { layerElement } from './index.module.css'

export default defineComponent({
  setup() {
    const layerElementService = Container.get(LayerElementService)
    const state = computed((): ILayerElement[] => layerElementService.state)
    return (): JSX.Element => html(state.value)
  }
})

const html = (layerElements: ILayerElement[]): JSX.Element => (
  <ul class={layerElement}>
    {layerElements.map(({ height, id, isActive, name, src, width }) => (
      <li>
        <LayerIcon alt={name} height={height} id={id} key={id} src={src} width={width} />
        <LayerElement id={id} isActive={isActive} key={id} name={name} />
      </li>
    ))}
  </ul>
)
