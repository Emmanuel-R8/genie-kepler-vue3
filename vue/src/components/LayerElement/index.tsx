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
  setup(props) {
    const { id, name } = props
    return (): JSX.Element => (
      /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */
      <div id={id} class={`layer-element ${props.isActive ? active : inactive}`}>
        {name}
      </div>
    )
  }
})
