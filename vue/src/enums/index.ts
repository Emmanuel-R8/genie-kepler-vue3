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

export enum LogStates {
  REACTIVE = 'reactive',
  STATIC = 'static'
}

export enum LogStatus {
  NEW = 'NEW',
  OLD = 'OLD'
}

export enum ReactiveStates {
  HEXAGON_LAYER_REACTIVE_PROPS = 'hexagonLayerReactiveProps',
  LAYER_ELEMENTS = 'layerElements',
  MODAL = 'modal'
}

export enum StaticStates {
  DECKGL_VIEW_SETTINGS = 'deckglViewSettings',
  LAYER_VISIBILITY = 'layerVisibilty',
  MAP_STYLES = 'mapStyles',
  MAPBOX_SETTINGS = 'mapboxSettings'
}

export enum Urls {
  API_BASE_URL = 'http://localhost:8000/api/',
  HEXAGON_LAYER_DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
}
