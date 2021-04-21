import { defineComponent } from 'vue'

import Header from '@/components/Header'

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
