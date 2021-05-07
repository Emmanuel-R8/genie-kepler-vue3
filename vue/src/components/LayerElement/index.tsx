import { defineComponent } from 'vue'

import scss from '@/components/Layers/index.module.scss'

const html = (props: Record<string, any>): JSX.Element => (
  <li>
    <div id={props.id} class={props.active ? scss['active'] : ''} onClick={props.click}>
      {props.name}
    </div>
  </li>
)

export default defineComponent({
  props: {
    active: {
      type: Boolean,
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
  setup(props: Record<string, any>) {
    return (): JSX.Element => html(props)
  }
})
