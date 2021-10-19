import { defineComponent } from 'vue'

import { header, name, title } from './index.module.css'

export default defineComponent({
  setup() {
    return (): JSX.Element => html()
  }
})

const html = (): JSX.Element => (
  <header class={header}>
    <img src="assets/logo.png" alt="Geospatial Web Logo" aria-label="Geospatial Web Logo" />
    <div id="name" class={name} aria-labelledby="name">
      Geospatial Web
    </div>
    <div id="title" class={title} aria-labelledby="title">
      Go REST API&ensp;&ensp;Vue 3 Composition API&ensp;&ensp;TSX
    </div>
    <a
      aria-label="GitLab Repository Link"
      href="https://gitlab.com/geospatialweb/go-vue3-tsx"
      rel="noopener noreferrer"
      target="_blank"
    >
      GitLab Repository
    </a>
  </header>
)
