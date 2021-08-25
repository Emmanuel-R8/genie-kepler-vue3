import { Container } from 'typedi'
import { defineComponent, onBeforeMount } from 'vue'

import { HeaderVue } from '@/components'
import { App_Service } from '@/services'

export default defineComponent({
    setup() {
        onBeforeMount(async (): Promise<void> => loadData())
        return (): JSX.Element => html()
    }
})

const html = (): JSX.Element => (
    <>
        <HeaderVue />
        <router-view />
    </>
)

const loadData = async (): Promise<void> => {
    const appService = Container.get(App_Service)
    await appService.loadData()
}
