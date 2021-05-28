export default {
  options: {
    canvas: 'hexagon',
    container: 'deckgl',
    controller: true,
    interactive: false,
    style: 'mapbox://styles/mapbox/dark-v10'
  },
  settings: {
    bearing: -30,
    center: { lng: -3.0, lat: 53.0 },
    latitude: 53.0,
    longitude: -3.0,
    maxZoom: 12,
    minZoom: 2,
    pitch: 50,
    zoom: 6.5
  },
  skyLayer: {
    id: 'sky',
    type: 'sky',
    paint: {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 0.0],
      'sky-atmosphere-sun-intensity': 0
    }
  }
}
