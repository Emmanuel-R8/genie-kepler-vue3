import { defineComponent, onMounted } from 'vue'
import mapboxgl, { Map, NavigationControl } from 'mapbox-gl'

import scss from './index.module.scss'

export default defineComponent({
  setup() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2Vvc3BhdGlhbHdlYiIsImEiOiJ6WGdOUFRvIn0.GoVRwZq5EfVsLNGyCqgZTw'

    onMounted(() => {
      const map: Map = new Map({
        bearing: 0,
        center: [-76.3, 44.45],
        container: 'mapbox',
        doubleClickZoom: false,
        maxZoom: 18,
        minZoom: 2,
        pitch: 0,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        zoom: 9
      }).addControl(new NavigationControl(), 'top-left')
    })
    return () => {
      return <div id="mapbox" class={scss.mapbox}></div>
    }
  }
})
