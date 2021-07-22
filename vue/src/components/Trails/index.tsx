import { defineComponent } from 'vue'

import { trails } from '@/config'
import { trail } from './index.module.css'

export default defineComponent({
  setup() {
    return (): JSX.Element => html()
  }
})

const html = (): JSX.Element => (
  <select class={`trails ${trail}`}>
    {trails.map(({ name }) => (
      <option key={name}>{name}</option>
    ))}
  </select>
)
