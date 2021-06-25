import { Container } from 'typedi'
import { defineComponent, onBeforeMount } from 'vue'

import { Header } from '@/components'
import { AppService } from '@/services'

const html = (): JSX.Element => (
  <div>
    <Header />
    <router-view />
  </div>
)

export default defineComponent({
  setup() {
    onBeforeMount(async (): Promise<void> => {
      const appService = Container.get(AppService)
      await appService.loadData()
    })
    return (): JSX.Element => html()
  }
})
