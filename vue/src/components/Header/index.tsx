import { defineComponent } from 'vue'

import { header, name, title } from './index.module.css'

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <header class={header}>
        <img src="assets/logo.png" alt="Geospatial Web" />
        <div class={name}>Geospatial Web</div>
        <div class={title}>
          Golang API&ensp;&#58;&ensp;Vue 3 Composition
          API&ensp;&#58;&ensp;TSX&ensp;&#58;&ensp;Mapbox GL&ensp;&#58;&ensp;Deck
          GL&ensp;&#58;&ensp;PostgreSQL
        </div>
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
