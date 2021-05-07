import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { AppService } from '@/services'
import scss from './index.module.scss'

const appService: AppService = Container.get(AppService)
const html = (): JSX.Element => <div id="hexagon" class={scss.deckgl}></div>

export default defineComponent({
  setup() {
    appService.loadMap()
    return (): JSX.Element => html()
  }
})
