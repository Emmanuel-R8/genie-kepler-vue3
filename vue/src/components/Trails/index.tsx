import { defineComponent } from 'vue'

import { trails } from '@/config'
import { trail } from './index.module.css'

export default defineComponent({
  setup() {
    return (): JSX.Element => html()
  }
})

const html = (): JSX.Element => (
  <select aria-label="Select Trail" class={`trails ${trail}`}>
    {trails.map(({ name }) => (
      <option aria-label={name} key={name}>
        {name}
      </option>
    ))}
  </select>
)
