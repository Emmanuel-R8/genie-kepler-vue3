import { defineComponent, PropType } from 'vue'

import { StateStatus } from '@/enums'
import scss from '@/components/LayerElements/index.module.scss'

type Props = {
  click: (evt: Event) => void
  id: string
  isActive: boolean
  name: string
}

const { ACTIVE } = StateStatus
const html = (props: Props): JSX.Element => (
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
  setup(props: Props) {
    return (): JSX.Element => html(props)
  }
})
