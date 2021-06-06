import { defineComponent } from 'vue'

import scss from './index.module.scss'

const html = (): JSX.Element => (
  <div class={scss.footer}>
    <div>Use Mouse Wheel to zoom</div>
    <div>Hold down Shift key to rotate map</div>
  </div>
)

export default defineComponent({
  setup() {
    return (): JSX.Element => html()
  }
})
