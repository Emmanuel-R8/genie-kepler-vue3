export default {
  navigationControl: {
    position: 'top-left',
    visualizePitch: true
  },
  options: {
    container: 'mapbox',
    doubleClickZoom: false,
    maxZoom: 18,
    minZoom: 2
  },
  settings: {
    bearing: 0,
    bounds: undefined,
    center: { lng: -76.3, lat: 44.5 },
    pitch: 0,
    style: 'mapbox://styles/mapbox/outdoors-v11',
    zoom: 9.5
  },
  skyLayer: {
    id: 'sky',
    type: 'sky',
    paint: {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 0.0],
      'sky-atmosphere-sun-intensity': 25
    }
  }
}