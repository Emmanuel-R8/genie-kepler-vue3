import { defineComponent } from 'vue'

import { trails } from '@/config'
import { trail } from './index.module.css'

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */
      <select class={`trails ${trail}`}>
        {trails.map(({ name }) => (
          <option key={name}>{name}</option>
        ))}
      </select>
    )
  }
})
