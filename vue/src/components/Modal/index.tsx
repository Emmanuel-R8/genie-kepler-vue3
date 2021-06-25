import { defineComponent } from 'vue'

import { ModalProps } from '@/types'
import scss from './index.module.scss'

const html = ({ isActive }: ModalProps): JSX.Element => (
  <div class={`${scss.modal} ${scss[isActive ? 'active' : '']}`}></div>
)

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  setup(props: ModalProps) {
    return (): JSX.Element => html(props)
  }
})
