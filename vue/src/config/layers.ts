export default [
  {
    fields: 'name,description,geom',
    layer: {
      id: 'biosphere',
      type: 'fill',
      source: {
        type: 'geojson',
        data: {}
      },
      layout: {
        visibility: 'none'
      },
      paint: {
        'fill-color': '#090',
        'fill-opacity': 0.3,
        'fill-outline-color': '#000'
      }
    }
  },
  {
    fields: 'name,description,lat,lng,geom',
    layer: {
      id: 'trails',
      type: 'line',
      source: {
        type: 'geojson',
        data: {}
      },
      layout: {
        visibility: 'none'
      },
      paint: {
        'line-color': '#900',
        'line-width': 3
      }
    }
  }
]
