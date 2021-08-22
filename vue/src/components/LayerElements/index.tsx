import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { LayerElementVue, LayerIconVue } from '@/components'
import { ILayerElement } from '@/interfaces'
import { LayerElementService } from '@/services'
import { layerElement } from './index.module.css'

export default defineComponent({
    setup() {
        const layerElementsState = getLayerElementsState()
        return (): JSX.Element => html(layerElementsState.value)
    }
})

const html = (layerElements: ILayerElement[]): JSX.Element => (
    <ul class={layerElement}>
        {layerElements.map(({ height, id, isActive, name, src, width }) => (
            <li>
                <LayerIconVue alt={name} height={height} id={id} key={id} src={src} width={width} />
                <LayerElementVue id={id} isActive={isActive} key={id} name={name} />
            </li>
        ))}
    </ul>
)

const getLayerElementsState = (): ComputedRef<ILayerElement[]> => {
    const layerElementService = Container.get(LayerElementService)
    return computed((): ILayerElement[] => layerElementService.state)
}
