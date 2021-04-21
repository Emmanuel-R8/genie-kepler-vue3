import { defineComponent } from 'vue'

import Mapbox from '@/components/Mapbox'

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
