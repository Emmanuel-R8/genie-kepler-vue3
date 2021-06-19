import { defineComponent, PropType } from 'vue'

import scss from '@/components/LayerElements/index.module.scss'

type Props = {
  click: (evt: Event) => void
  id: string
  isActive: boolean
  name: string
}

const html = ({ click, id, isActive, name }: Props): JSX.Element => (
  <li>
    <div id={id} class={scss[isActive ? 'active' : '']} onClick={click}>
      {name}
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
