import * as fetch from 'd3-fetch'
import { FeatureCollection } from 'geojson'
import mapboxgl from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { layers } from '@/config'
import { EndPoints, Urls } from '@/enums'
import { HttpParams, Layer } from '@/interfaces'
import { HttpService, /* LayerService, */ MapboxService } from '@/services'

@Service()
export default class DataService {
  constructor(
    public hexagonData: any[],
    private _endPoints: Record<string, string>,
    private _http: HttpService,
    private _layers: any[],
    // private _layerService: LayerService,
    private _mapboxService: MapboxService,
    private _urls: Record<string, string>
  ) {
    this._endPoints = EndPoints
    this._http = Container.get(HttpService)
    this._layers = layers
    // this._layerService = Container.get(LayerService)
    this._mapboxService = Container.get(MapboxService)
    this._urls = Urls
  }

  async getMapboxAccessToken(): Promise<any> {
    try {
      const { MAPBOX_ACCESS_TOKEN_ENDPOINT } = this._endPoints
      const { data } = await this._http.get(MAPBOX_ACCESS_TOKEN_ENDPOINT)

      if (data && <Record<string, string>>data) {
        const { token } = data
        mapboxgl.accessToken = token
        return this._mapboxService.loadMapbox()
      }
      return console.log(`No Mapbox Access Token Found:\n`, data)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }

  loadData(): void {
    this.getHeatmapData()
    this.getMapboxData()
  }

  private getHeatmapData(): void {
    const { HEATMAP_DATA_URL } = this._urls
    fetch
      .csv(HEATMAP_DATA_URL)
      .then((data: any[]) => {
        data?.length ? (this.hexagonData = data) : console.error('Data Error:\n', data)
      })
      .catch((err: Error) => {
        console.error('getHeatmapData Failed:\n', err)
      })
  }

  private getMapboxData(): void {
    this._layers.forEach((layer: Layer, i: number): void => {
      this.getMapboxLayers(layer, i)
    })
  }

  private async getMapboxLayers(layer: Layer, i: number): Promise<void> {
    // prettier-ignore
    const { fields, layer: { id } } = layer

    try {
      const params: HttpParams = { fields, table: id }
      const { GEOJSON_ENDPOINT } = this._endPoints
      const { data } = await this._http.get(GEOJSON_ENDPOINT, { params })

      if (data?.features?.length && <FeatureCollection>data) {
        const layer: Layer = this._layers[i].layer
        layer.source.data = data
        return console.log(data, id)
        // return this._layerService.setLayers(layer)
      }
      return console.log(`No ${id.toUpperCase()} FeatureCollection Found:\n`, data)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }
}
