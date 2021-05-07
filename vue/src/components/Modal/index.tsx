import { defineComponent } from 'vue'

import scss from './index.module.scss'

const html = (props: Record<string, string>): JSX.Element => (
  <div class={`${scss.modal} ${scss[props.class]}`}></div>
)

export default defineComponent({
  props: {
    class: {
      type: String,
      required: true
    }
  },
  setup(props: Record<string, string>) {
    return (): JSX.Element => html(props)
  }
})
