export enum EndPoints {
  GEOJSON_ENDPOINT = '/geojson',
  MAPBOX_ACCESS_TOKEN_ENDPOINT = '/mapbox-access-token'
}

export enum LayerElements {
  BIOSPHERE = 'biosphere',
  BIOSPHERE_BORDER = 'biosphere-border',
  DECKGL = 'deckgl',
  OFFICE = 'office',
  PLACES = 'places',
  SATELLITE = 'satellite',
  TRAILS = 'trails'
}

export enum States {
  DECKGL_VIEW_SETTINGS = 'deckglViewSettings',
  HEXAGON_LAYER_REACTIVE_PROPS = 'hexagonLayerReactiveProps',
  LAYER_ELEMENTS = 'layerElements',
  LAYERS = 'layers',
  MAP_STYLES = 'mapStyles',
  MAPBOX_SETTINGS = 'mapboxSettings',
  MODAL = 'modal'
}

export enum Urls {
  API_BASE_URL = 'http://localhost:8000/api/',
  HEXAGON_LAYER_DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
}
