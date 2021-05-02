export enum StoreActions {
  SET_LAYER_ELEMENTS = 'SET_LAYER_ELEMENTS',
  SET_MAP_STYLES = 'SET_MAP_STYLES',
  SET_STYLE_LAYERS_VISIBILITY = 'SET_STYLE_LAYERS_VISIBILITY'
}

export enum StoreMutations {
  SET_LAYER_ELEMENTS = 'SET_LAYER_ELEMENTS',
  SET_MAP_SETTINGS = 'SET_MAP_SETTINGS',
  SET_MAP_STYLES = 'SET_MAP_STYLES',
  SET_STYLE_LAYERS_VISIBILITY = 'SET_STYLE_LAYERS_VISIBILITY'
}

export enum EndPoints {
  GEOJSON_ENDPOINT = '/geojson',
  MAPBOX_ACCESS_TOKEN_ENDPOINT = '/mapbox-access-token'
}

export enum Urls {
  HEATMAP_DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
}
