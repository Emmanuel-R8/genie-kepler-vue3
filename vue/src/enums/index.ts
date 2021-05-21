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

export enum Routes {
  DECKGL = 'deckgl',
  MAPBOX = 'mapbox'
}

export enum States {
  DECKGL_SETTINGS = 'deckglSettings',
  HEXAGON_LAYER_PROPS = 'hexagonLayerProps',
  LAYER_ELEMENTS = 'layerElements',
  MODAL = 'modal',
  MAPBOX_SETTINGS = 'mapboxSettings',
  MAP_STYLES = 'mapStyles',
  STYLE_LAYERS_VISIBILITY = 'styleLayersVisibility'
}

export enum Urls {
  BASE_URL = 'http://localhost:8000/api/',
  HEXAGON_DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
}
