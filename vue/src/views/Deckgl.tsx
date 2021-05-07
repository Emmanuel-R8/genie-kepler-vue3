import { defineComponent } from 'vue'

import { Hexagon } from '@/components'

export default defineComponent({
  setup() {
    return (): JSX.Element => <Hexagon />
  }
})
