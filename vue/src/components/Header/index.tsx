import { defineComponent } from 'vue'

import { header, name, title } from './index.module.scss'

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <header class={header}>
        <img src="assets/logo.png" alt="Geospatial Web" />
        <div class={name}>Geospatial Web</div>
        <div class={title}>Go | Vue 3 Composition API | TSX | Mapbox GL | Deck.gl | PostGIS 3</div>
        <a
          href="https://gitlab.com/geospatialweb/go-vue3-tsx"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitLab Repository
        </a>
      </header>
    )
  }
})
