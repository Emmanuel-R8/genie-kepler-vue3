import { defineComponent } from 'vue'

import { Header } from '@/components'

export default defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <Header />
          <router-view></router-view>
        </div>
      )
    }
  }
})
