import { defineComponent, PropType } from 'vue'

import { StateStatus } from '@/enums'
import scss from './index.module.scss'

export default defineComponent({
  props: {
    isActive: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  setup(props) {
    const { ACTIVE, INACTIVE } = StateStatus
    return (): JSX.Element => (
      <div class={`${scss.modal} ${scss[props.isActive ? ACTIVE : INACTIVE]}`}></div>
    )
  }
})
