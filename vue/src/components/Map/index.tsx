import { Container } from 'typedi'
import { defineComponent, onMounted } from 'vue'

import { Layers, Trails } from '@/components'
import { AppService } from '@/services'

import scss from './index.module.scss'

const loadMap = (): void => {
  const appService: AppService = Container.get(AppService)
  appService.loadMap()
}

export default defineComponent({
  setup() {
    onMounted(() => {
      loadMap()
    })
    return () => (
      <div id="mapbox" class={scss.mapbox}>
        <Layers />
        <Trails />
      </div>
    )
  }
})
