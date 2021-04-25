import { Container } from 'typedi'
import { defineComponent, onMounted } from 'vue'

import { AppService } from '@/services'
import scss from './index.module.scss'

const loadApp = (): void => {
  const appService: AppService = Container.get(AppService)
  appService.loadApp()
}

export default defineComponent({
  setup() {
    onMounted(() => {
      loadApp()
    })
    return () => {
      return <div id="mapbox" class={scss.mapbox}></div>
    }
  }
})
