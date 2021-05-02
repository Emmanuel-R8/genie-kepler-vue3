import { defineComponent } from 'vue'

import scss from '@/components/Layers/index.module.scss'

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false,
      required: true
    },
    click: {
      type: Function,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    return (props: Record<string, any>) => (
      <li>
        <div id={props.id} class={props.active ? scss['active'] : ''} onClick={props.click}>
          {props.name}
        </div>
      </li>
    )
  }
})
