import { defineComponent } from 'vue'

import scss from './index.module.scss'

const html = (): JSX.Element => (
  <div class={scss.header}>
    <img src="assets/logo.png" alt="Geospatial Web" />
    <div class={scss.name}>Geospatial Web</div>
    <div class={scss.title}>Go | Vue 3 Composition API | TSX | Mapbox GL | Deck.gl | PostGIS 3</div>
    <a
      href="https://gitlab.com/geospatialweb/go-vue3-tsx"
      rel="noopener noreferrer"
      target="_blank"
    >
      GitLab Repository
    </a>
  </div>
)

export default defineComponent({
  setup() {
    return (): JSX.Element => html()
  }
})
