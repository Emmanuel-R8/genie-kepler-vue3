import { defineComponent } from 'vue'

import { active, inactive } from './index.module.css'

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    return (): JSX.Element => <div class={props.isActive ? active : inactive}></div>
  }
})
