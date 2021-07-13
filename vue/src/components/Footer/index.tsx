import { defineComponent } from 'vue'

import { footer } from './index.module.css'

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <footer class={footer}>
        <div>Use Mouse Wheel to zoom</div>
        <div>Hold down Shift key to rotate map</div>
      </footer>
    )
  }
})
