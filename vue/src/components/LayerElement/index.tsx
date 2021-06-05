import { defineComponent, PropType } from 'vue'

import { ActiveState } from '@/enums'
import scss from '@/components/LayerElements/index.module.scss'

const { ACTIVE } = ActiveState
const html = (props: Record<string, any>): JSX.Element => (
  <li>
    <div id={props.id} class={props.isActive ? scss[ACTIVE] : ''} onClick={props.click}>
      {props.name}
    </div>
  </li>
)

export default defineComponent({
  props: {
    click: {
      type: Function as PropType<(evt: Event) => void>,
      required: true
    },
    id: {
      type: String as PropType<string>,
      required: true
    },
    isActive: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    name: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props) {
    return (): JSX.Element => html(props)
  }
})
