import { defineComponent } from 'vue'

import { ILayerElement_ReactiveProps } from '../LayerElement/interfaces'

import { active, inactive } from '../Modal/index.module.css'

export default defineComponent({
    props: {
        id: { type: String, required: true },
        isActive: { type: Boolean, required: true },
        name: { type: String, required: true }
    },

    setup(props: ILayerElement_ReactiveProps) {
        return (): JSX.Element => html(props)
    }
})

const html = ({ id, isActive, name }: ILayerElement_ReactiveProps): JSX.Element => (
    <div id={id} class={`layer-element ${isActive ? active : inactive}`}>
        {name}
    </div>
)
