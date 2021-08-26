import { Container } from 'typedi'
import { computed, ComputedRef, defineComponent } from 'vue'
import { hexagonUI } from './index.module.css'

import { HexagonUIVue } from '@/components'
import { IHexagonLayer_ReactiveProps } from './interfaces'
import { HexagonLayer_Service } from './services'

export default defineComponent({
    setup() {
        const hexagonLayerPropsState = getHexagonLayerPropsState()
        return (): JSX.Element => html(hexagonLayerPropsState.value)
    }
})

const html = ({ coverage, elevationScale, radius, upperPercentile }: IHexagonLayer_ReactiveProps): JSX.Element => (
    <HexagonUIVue
        class={hexagonUI}
        coverage={coverage}
        elevationScale={elevationScale}
        radius={radius}
        upperPercentile={upperPercentile}
    />
)

const getHexagonLayerPropsState = (): ComputedRef<IHexagonLayer_ReactiveProps> => {
    const hexagonLayerService = Container.get(HexagonLayer_Service)
    return computed((): IHexagonLayer_ReactiveProps => HexagonLayer_Service.state())
}
