import { defineComponent } from 'vue'

import scss from './index.module.scss'

const html = (props: Record<string, any>): JSX.Element => (
  <div class={`${scss.modal} ${scss[props.class]}`}></div>
)

export default defineComponent({
  props: {
    class: {
      type: String,
      required: true
    }
  },
  setup() {
    return (props: Record<string, any>) => html(props)
  }
})
