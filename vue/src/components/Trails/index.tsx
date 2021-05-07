import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { trails } from '@/config'
import { MapService } from '@/services'
import scss from './index.module.scss'

const mapService: MapService = Container.get(MapService)
const selectTrail = (trailName: string) => {
  const i = trails.findIndex((trail: any) => trail.name === trailName)
  if (i > 0) {
    mapService.flyTo(trails[i])
  }
}
const onSelectTrailHandler = (evt: any) => {
  evt.stopPropagation()
  /* prettier-ignore */
  if (evt?.target?.value) {
    const { target: { value } } = evt
    selectTrail(value)
  }
}
const html = (): JSX.Element => (
  <select class={scss.trails} onChange={onSelectTrailHandler}>
    {trails.map((trail: any) => (
      <option key={trail.name}>{trail.name}</option>
    ))}
  </select>
)

export default defineComponent({
  setup() {
    return (): JSX.Element => html()
  }
})
