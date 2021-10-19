import { defineComponent } from 'vue'

import { ILayerElementProps } from '@/interfaces'
import { active, inactive } from '@/components/LayerElements/index.module.css'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props: ILayerElementProps) {
    return (): JSX.Element => html(props)
  }
})

const html = ({ id, isActive, name }: ILayerElementProps): JSX.Element => (
  <div id={id} class={`layer-element ${isActive ? active : inactive}`} aria-labelledby={id}>
    {name}
  </div>
)
