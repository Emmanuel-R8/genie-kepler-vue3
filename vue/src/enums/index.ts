export enum Routes {
  DECKGL = 'deckgl',
  MAPBOX = 'mapbox'
}

export enum State {
  DECKGL_SETTINGS = 'deckglSettings',
  HEXAGON_LAYER_PROPS = 'hexagonLayerProps',
  LAYER_ELEMENTS = 'layerElements',
  MODAL = 'modal',
  MAPBOX_SETTINGS = 'mapboxSettings',
  MAP_STYLES = 'mapStyles',
  STYLE_LAYERS_VISIBILITY = 'styleLayersVisibility'
}

export enum EndPoints {
  GEOJSON_ENDPOINT = '/geojson',
  MAPBOX_ACCESS_TOKEN_ENDPOINT = '/mapbox-access-token'
}

export enum Urls {
  HEXAGON_DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
}
