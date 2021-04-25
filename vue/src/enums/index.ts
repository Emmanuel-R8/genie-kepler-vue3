export enum StoreActions {
  SET_LAYERS_VISIBILITY = 'SET_LAYERS_VISIBILITY',
  SET_MARKERS_VISIBILITY = 'SET_MARKERS_VISIBILITY'
}

export enum StoreMutations {
  SET_LAYERS_VISIBILITY = 'SET_LAYERS_VISIBILITY',
  SET_MARKERS_VISIBILITY = 'SET_MARKERS_VISIBILITY',
  SET_MAP_SETTINGS = 'SET_MAP_SETTINGS'
}

export enum EndPoints {
  GEOJSON_ENDPOINT = '/geojson',
  MAPBOX_ACCESS_TOKEN_ENDPOINT = '/mapbox-access-token'
}

export enum Urls {
  HEATMAP_DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
}
