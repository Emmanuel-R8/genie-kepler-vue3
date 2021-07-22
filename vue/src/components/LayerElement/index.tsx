import { defineComponent } from 'vue'

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
  setup(props: Record<string, any>) {
    return (): JSX.Element => html(props)
  }
})

const html = ({ id, isActive, name }: Record<string, any>): JSX.Element => (
  <div id={id} class={`layer-element ${isActive ? active : inactive}`}>
    {name}
  </div>
)
