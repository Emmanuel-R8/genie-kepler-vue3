import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { Header } from '@/components'
import { DataService } from '@/services'

const html = (): JSX.Element => (
  <div>
    <Header />
    <router-view />
  </div>
)

export default defineComponent({
  setup() {
    const dataService: DataService = Container.get(DataService)
    dataService.loadData()
    return (): JSX.Element => html()
  }
})
