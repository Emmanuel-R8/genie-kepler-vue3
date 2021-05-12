export default {
  id: 'mapbox',
  mapOptions: {
    container: 'mapbox',
    doubleClickZoom: false,
    maxZoom: 18,
    minZoom: 2
  },
  mapSettings: {
    bearing: 0,
    center: { lng: -76.3, lat: 44.5 },
    pitch: 0,
    style: 'mapbox://styles/mapbox/outdoors-v11',
    zoom: 9.5
  },
  mapStyles: {
    active: 'outdoors',
    outdoors: {
      id: 'outdoors',
      url: 'mapbox://styles/mapbox/outdoors-v11',
      visible: true
    },
    satellite: {
      id: 'satellite',
      url: 'mapbox://styles/mapbox/satellite-v9',
      visible: false
    }
  },
  navigationControl: {
    position: 'top-left',
    visualizePitch: true
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
