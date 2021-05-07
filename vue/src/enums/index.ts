export enum State {
  LAYER_ELEMENTS = 'layerElements',
  MODAL = 'modal',
  MAP_SETTINGS = 'mapSettings',
  MAP_STYLES = 'mapStyles',
  STYLE_LAYERS = 'styleLayers'
}

export enum EndPoints {
  GEOJSON_ENDPOINT = '/geojson',
  MAPBOX_ACCESS_TOKEN_ENDPOINT = '/mapbox-access-token'
}

export enum Urls {
  HEATMAP_DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
}
