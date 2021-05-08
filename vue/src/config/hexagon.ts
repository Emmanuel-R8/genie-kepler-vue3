export default {
  id: 'hexagon',
  navigationControl: {
    position: 'top-left'
  },
  params: {
    coverage: 1,
    elevationScale: 100,
    radius: 1000,
    upperPercentile: 100
  },
  props: {
    coverage: 1,
    colorRange: [
      [1, 152, 189],
      [73, 227, 206],
      [216, 254, 181],
      [254, 237, 177],
      [254, 173, 84],
      [209, 55, 78]
    ],
    elevationRange: [0, 2500],
    elevationScale: 100,
    extruded: true,
    material: {
      ambient: 0.6,
      diffuse: 0.6,
      shininess: 50,
      specularColor: [200, 200, 200]
    },
    opacity: 1,
    radius: 1000,
    upperPercentile: 100
  },
  settings: {
    bearing: -30,
    center: [-1.8, 52.1],
    container: 'mapbox',
    initial: {
      bearing: -30,
      center: [-1.8, 52.0],
      pitch: 50,
      zoom: 6.5
    },
    maxZoom: 18,
    minZoom: 2,
    pitch: 50,
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 6.5
  }
}
