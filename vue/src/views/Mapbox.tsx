import { defineComponent } from 'vue'

import { Map } from '@/components'

export default defineComponent({
  setup() {
    return (): JSX.Element => <Map />
  }
})
