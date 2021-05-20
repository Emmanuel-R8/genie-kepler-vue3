import { defineComponent } from 'vue'

import scss from './index.module.scss'

export default defineComponent({
  setup() {
    return (): JSX.Element => <div class={scss.footer}>Hold down Shift key to rotate map</div>
  }
})
