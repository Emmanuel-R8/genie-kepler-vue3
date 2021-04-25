import { Container } from 'typedi'
import { defineComponent, onBeforeMount } from 'vue'

import { Header } from '@/components'
import { AppService } from '@/services'

const loadData = (): void => {
  const appService: AppService = Container.get(AppService)
  appService.loadData()
}

export default defineComponent({
  setup() {
    onBeforeMount(() => {
      loadData()
    })
    return () => {
      return (
        <div>
          <Header />
          <router-view />
        </div>
      )
    }
  }
})
