import { Container } from 'typedi'
import { defineComponent, onMounted } from 'vue'

import { AppService } from '@/services'
import scss from './index.module.scss'

export default defineComponent({
  setup() {
    onMounted(() => {
      const appService: AppService = Container.get(AppService)
      appService.loadMap()
    })
    return () => {
      return <div id="mapbox" class={scss.mapbox}></div>
    }
  }
})
