import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { Header } from '@/components'
import { AppService } from '@/services'

const appService: AppService = Container.get(AppService)
const html = (): JSX.Element => (
  <div>
    <Header />
    <router-view />
  </div>
)

export default defineComponent({
  setup() {
    appService.loadData()
    return (): JSX.Element => html()
  }
})
