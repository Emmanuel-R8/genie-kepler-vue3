import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'

import { LayerElement_Vue, LayerIcon_Vue } from '@/components'

import { ILayerElement_ReactiveProps } from '../LayerElement/interfaces'
import { LayerElement_Service } from '../LayerElement/services'

import { layerElement } from './index.module.css'

export default defineComponent({
    setup() {
        const layerElementsState = getLayerElementsState()
        return (): JSX.Element => html(layerElementsState.value)
    }
})

const html = (layerElements: ILayerElement_ReactiveProps[]): JSX.Element => (
    <ul class={layerElement}>
        {layerElements.map(({ height, id, isActive, name, src, width }) => (
            <li>
                <LayerIcon_Vue alt={name} height={height} id={id} key={id} src={src} width={width} />
                <LayerElement_Vue id={id} isActive={isActive} key={id} name={name} />
            </li>
        ))}
    </ul>
)

const getLayerElementsState = (): ComputedRef<ILayerElement_ReactiveProps[]> => {
    const layerElementService = Container.get(LayerElement_Service)
    return computed((): ILayerElement_ReactiveProps[] => layerElementService.state)
}
