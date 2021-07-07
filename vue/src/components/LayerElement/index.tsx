import { defineComponent, PropType } from 'vue'

import { active, inactive } from '@/components/LayerElements/index.module.scss'

export default defineComponent({
  props: {
    click: {
      type: Function as PropType<(evt: Event) => void>,
      required: true
    },
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
    const { click, id, name } = props
    return (): JSX.Element => (
      <li>
        <div id={id} class={props.isActive ? active : inactive} onClick={click}>
          {name}
        </div>
      </li>
    )
  }
})
