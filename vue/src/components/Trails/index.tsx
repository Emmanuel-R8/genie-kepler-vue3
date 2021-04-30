import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { trails } from '@/config'
import { MapService } from '@/services'

import scss from './index.module.scss'

const selectTrail = (trailName: string) => {
  const mapService: MapService = Container.get(MapService)
  const i = trails.findIndex((trail: any) => trail.name === trailName)

  if (i > 0) {
    mapService.flyTo(trails[i])
  }
}

const onSelectTrailHandler = (evt: any) => {
  /* prettier-ignore */
  if (evt?.target?.value) {
    const { target: { value } } = evt
    selectTrail(value)
  }
}

export default defineComponent({
  setup() {
    return () => (
      <select id="trails" class={scss.trails} onChange={onSelectTrailHandler}>
        {trails.map((trail: any) => (
          <option key={trail.name}>{trail.name}</option>
        ))}
      </select>
    )
  }
})