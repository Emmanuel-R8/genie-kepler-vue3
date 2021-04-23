export default {
  mapbox: {
    navigationControl: {
      position: 'top-left'
    },
    settings: {
      bearing: 0,
      bounds: null,
      center: [-76.3, 44.45],
      container: 'mapbox',
      doubleClickZoom: false,
      maxZoom: 18,
      minZoom: 2,
      pitch: 0,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      zoom: 9
    },
    styles: {
      outdoors: {
        name: 'outdoors',
        active: true,
        type: 'vector',
        url: 'mapbox://styles/mapbox/cjaudgl840gn32rnrepcb9b9g'
      },
      satellite: {
        name: 'satellite',
        active: false,
        type: 'vector',
        url: 'mapbox://styles/mapbox/satellite-v9'
      }
    }
  }
}
