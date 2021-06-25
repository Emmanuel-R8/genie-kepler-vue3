import { defineComponent, PropType } from 'vue'

import { LayerElementProps } from '@/types'
import scss from '@/components/LayerElements/index.module.scss'

const html = ({ click, id, isActive, name }: LayerElementProps): JSX.Element => (
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
  setup(props: LayerElementProps) {
    return (): JSX.Element => html(props)
  }
})
