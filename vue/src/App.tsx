import { Container } from 'typedi'
import { defineComponent, onBeforeMount } from 'vue'

import { Header } from '@/components'
import { AppService } from '@/services'

export default defineComponent({
  setup() {
    onBeforeMount(async (): Promise<void> => loadData())
    return (): JSX.Element => html()
  }
})

const html = (): JSX.Element => (
  <>
    <Header />
    <router-view />
  </>
)

const loadData = async (): Promise<void> => {
  const appService = Container.get(AppService)
  await appService.loadData()
}
