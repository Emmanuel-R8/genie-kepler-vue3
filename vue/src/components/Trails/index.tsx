import { Container } from 'typedi'
import { defineComponent } from 'vue'

import { trails } from '@/config'
import { TrailService } from '@/services'
import { trail } from './index.module.scss'

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <div>
        <select class={trail} onChange={onSelectTrailChangeHandler}>
          {trails.map(({ name }) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
    )
  }
})

const onSelectTrailChangeHandler = (evt: Event): void => {
  evt.stopPropagation()
  /* prettier-ignore */
  const { target: { value: trailName } }: Record<string, any> = evt
  const trailService = Container.get(TrailService)
  trailName && trailService.selectTrail(trailName)
}
