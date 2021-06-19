import { defineComponent } from 'vue'

import scss from './index.module.scss'

type Props = {
  isActive: boolean
}

const html = ({ isActive }: Props): JSX.Element => (
  <div class={`${scss.modal} ${scss[isActive ? 'active' : '']}`}></div>
)

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  setup(props: Props) {
    return (): JSX.Element => html(props)
  }
})
