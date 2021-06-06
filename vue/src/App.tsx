import { Container } from 'typedi'
import { defineComponent } from 'vue'

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
    const appService = Container.get(AppService)
    appService.loadApp()
    return (): JSX.Element => html()
  }
})
