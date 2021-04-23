import * as fetch from 'd3-fetch'
import { FeatureCollection } from 'geojson'
import mapboxgl from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { layers } from '@/config'
import { Urls } from '@/enums'
import { HttpParams, Layer } from '@/interfaces'
import { HttpService, MapboxService } from '@/services'
// import { LayerService } from '@/services'

@Service()
export default class DataService {
  constructor(
    public hexagonData: any[],
    private _httpService: HttpService,
    // private _layerService: LayerService,
    private _mapboxService: MapboxService,
    private _layers: any[],
    private _urls: Record<string, string>
  ) {
    this._httpService = Container.get(HttpService)
    // this._layerService = Container.get(LayerService)
    this._mapboxService = Container.get(MapboxService)
    this._layers = layers
    this._urls = Urls
  }

  async getMapboxAccessToken(): Promise<any> {
    try {
      const { MAPBOX_ACCESS_TOKEN_ENDPOINT } = this._urls
      const { data } = await this._httpService.get(MAPBOX_ACCESS_TOKEN_ENDPOINT)

      if (data && <Record<string, string>>data) {
        const { token } = data
        mapboxgl.accessToken = token
        return this._mapboxService.loadMapbox()
      }
      console.log(`No Mapbox Access Token Found:\n`, data)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }

  loadData(): void {
    // this.getDeckGlData()
    this.getMapboxData()
    // this.getMapboxMarkers()
  }

  private getDeckGlData(): void {
    const { HEXAGON_DATA_URL } = this._urls
    fetch
      .csv(HEXAGON_DATA_URL)
      .then((data: any[]) => {
        data?.length ? (this.hexagonData = data) : console.error('Data Error:\n', data)
      })
      .catch((err: Error) => {
        console.error('getDeckGlData Failed:\n', err)
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
    const params: HttpParams = { fields, table: id }

    try {
      const { GEOJSON_ENDPOINT } = this._urls
      const { data } = await this._httpService.get(GEOJSON_ENDPOINT, { params })

      if (data?.features?.length && <FeatureCollection>data) {
        const layer: Layer = this._layers[i].layer
        layer.source.data = data
        return console.log(data, id)
        // return this._layerService.setLayers(layer)
      }
      console.log(`No ${id.toUpperCase()} FeatureCollection Found:\n`, data)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }
}
