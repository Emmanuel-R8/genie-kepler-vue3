export default {
  hexagonOptions: {
    canvas: 'hexagon',
    container: 'deckgl',
    controller: true,
    // doubleClickZoom: true,
    interactive: false,
    maxZoom: 18,
    minZoom: 2,
    style: 'mapbox://styles/mapbox/dark-v10'
  },
  hexagonParams: {
    coverage: 1,
    elevationScale: 100,
    radius: 1000,
    upperPercentile: 100
  },
  hexagonProps: {
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
    id: 'heatmap',
    material: {
      ambient: 0.6,
      diffuse: 0.6,
      shininess: 50,
      specularColor: [200, 200, 200]
    },
    opacity: 1,
    pickable: true,
    radius: 1000,
    upperPercentile: 100
  },
  hexagonSettings: {
    bearing: -30,
    center: { lng: -3.0, lat: 53.0 },
    latitude: 53.0,
    longitude: -3.0,
    pitch: 50,
    zoom: 6.5
  }
}
