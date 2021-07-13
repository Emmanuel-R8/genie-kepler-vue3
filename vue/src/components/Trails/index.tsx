import { defineComponent } from 'vue'

import { trails } from '@/config'
import { trail } from './index.module.css'

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <div class={trail}>
        <select class="trails">
          {trails.map(({ name }) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
    )
  }
})
