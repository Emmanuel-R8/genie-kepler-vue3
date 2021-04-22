import { defineComponent } from 'vue'

import { Mapbox } from '@/components'

export default defineComponent({
  setup() {
    return () => {
      return (
        <>
          <Mapbox />
        </>
      )
    }
  }
})
