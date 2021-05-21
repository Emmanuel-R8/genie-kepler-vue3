import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { trails } from '@/config'
import { ITrail } from '@/interfaces'
import { TrailService } from '@/services'
import scss from './index.module.scss'

const onSelectTrailHandler = (evt: Event): void => {
  evt.stopPropagation()
  /* prettier-ignore */
  const { target: { value: trailName } } = evt as any
  const trailService: TrailService = Container.get(TrailService)
  trailName && trailService.selectTrail(trailName)
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
