import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { trails } from '@/config'
import { ITrail } from '@/interfaces'
import { TrailsService } from '@/services'
import scss from './index.module.scss'

const onSelectTrailHandler = (evt: any) => {
  evt.stopPropagation()
  const trailsService: TrailsService = Container.get(TrailsService)
  evt?.target?.value && trailsService.selectTrail(evt.target.value)
}
const html = (): JSX.Element => (
  <div>
    <select class={scss.trails} onChange={onSelectTrailHandler}>
      {trails.map((trail: ITrail) => (
        <option key={trail.name}>{trail.name}</option>
      ))}
    </select>
  </div>
)

export default defineComponent({
  setup() {
    return (): JSX.Element => html()
  }
})
