import { defineComponent } from 'vue'

import { ILayerElementProps } from '../LayerElement/interfaces'

import { active, inactive } from '../Modal/index.module.css'

export default defineComponent({
    props: {
        id: { type: String, required: true },
        isActive: { type: Boolean, required: true },
        name: { type: String, required: true }
    },
    setup(props: ILayerElementProps) {
        return (): JSX.Element => html(props)
    }
})

const html = ({ id, isActive, name }: ILayerElementProps): JSX.Element => (
    <div id={id} class={`layer-element ${isActive ? active : inactive}`}>
        {name}
    </div>
)
