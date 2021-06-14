import { defineComponent } from 'vue'

import { StateStatus } from '@/enums'
import scss from './index.module.scss'

type Props = {
  isActive: boolean
}

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  setup(props: Props) {
    const { ACTIVE, INACTIVE } = StateStatus
    return (): JSX.Element => (
      <div class={`${scss.modal} ${scss[props.isActive ? ACTIVE : INACTIVE]}`}></div>
    )
  }
})
