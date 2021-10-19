import { AxiosResponse } from 'axios'
import { DSVRowArray } from 'd3-dsv'
import { csv } from 'd3-fetch'
import { Feature, FeatureCollection } from 'geojson'
import cloneDeep from 'lodash.clonedeep'
import mapboxgl from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { layers, markers } from '@/config'
import { EndPoints, Urls } from '@/enums'
import { IHttpParams, IHttpResponse, ILayer, IMapboxAccessToken, IMarker } from '@/interfaces'
import { GeoJsonLayerService, HttpService, LogService, MarkerService } from '@/services'

@Service()
export default class DataService {
  private _endPoints: Record<string, string> = EndPoints
  private _layers: ILayer[] = layers
  private _markers: IMarker[] = markers
  private _urls: Record<string, string> = Urls

  constructor(
    private _hexagonLayerData: number[][],
    private _geoJsonLayerService: GeoJsonLayerService,
    private _httpService: HttpService,
    private _logService: LogService,
    private _markerService: MarkerService
  ) {
    this._geoJsonLayerService = Container.get(GeoJsonLayerService)
    this._httpService = Container.get(HttpService)
    this._logService = Container.get(LogService)
    this._markerService = Container.get(MarkerService)
  }

  get hexagonLayerData(): number[][] {
    return this._hexagonLayerData
  }

  get mapboxAccessToken(): string {
    const { accessToken } = mapboxgl
    return accessToken
  }

  async loadData(): Promise<void> {
    await this.getGeoJsonLayerData()
    await this.getGeoJsonMarkerData()
    await this.getHexagonLayerData()
  }

  async getMapboxAccessToken(): Promise<void> {
    const { MAPBOX_ACCESS_TOKEN_ENDPOINT } = this._endPoints
    /* prettier-ignore */
    const { data: { token } } = <IHttpResponse<IMapboxAccessToken>>
      await this.httpGetRequest(MAPBOX_ACCESS_TOKEN_ENDPOINT)
    this.setMapboxAccessToken(token)
  }

  private setMapboxAccessToken(token: string): void {
    token ? (mapboxgl.accessToken = token) : this._logService.consoleLog(`No Mapbox Access Token Found:\n`, token)
  }

  private async getHexagonLayerData(): Promise<void> {
    try {
      const { HEXAGON_LAYER_DATA_URL } = this._urls
      const data = await csv(HEXAGON_LAYER_DATA_URL)
      this.setHexagonLayerData(data)
    } catch (err) {
      this._logService.consoleError(`${this.getHexagonLayerData.name} Fetch Failed:\n`, err)
    }
  }

  private setHexagonLayerData(data: DSVRowArray<string>): void {
    data?.length
      ? (this._hexagonLayerData = data.map((d): number[] => [Number(d.lng), Number(d.lat)]))
      : this._logService.consoleLog(`No ${this.getHexagonLayerData.name} Found:\n`, data)
  }

  private async getGeoJsonLayerData(): Promise<void> {
    for (const layer of this._layers) {
      const fc = await this.getGeoJsonFeatureCollection(layer)
      this.setGeoJsonLayer(fc, layer)
    }
  }

  private setGeoJsonLayer(fc: FeatureCollection, layer: ILayer): void {
    fc?.features?.length
      ? this._geoJsonLayerService.setLayer(cloneDeep(fc), cloneDeep(layer))
      : this._logService.consoleLog(`No ${this.getGeoJsonLayerData.name} Features Found:\n`, fc)
  }

  private async getGeoJsonMarkerData(): Promise<void> {
    for (const marker of this._markers) {
      const { id } = marker
      const { features } = await this.getGeoJsonFeatureCollection(marker)
      this.setGeoJsonMarkers(id, features)
    }
  }

  private setGeoJsonMarkers(id: string, features: Feature[]): void {
    features?.length
      ? this._markerService.setMarkers(id, cloneDeep(features))
      : this._logService.consoleLog(`No ${this.getGeoJsonMarkerData.name} Features Found:\n`, features)
  }

  private async getGeoJsonFeatureCollection({ id, fields }: ILayer | IMarker): Promise<FeatureCollection> {
    const { GEOJSON_ENDPOINT } = this._endPoints
    const params: IHttpParams = { fields, table: id.split('-')[0] }
    const { data } = <IHttpResponse<FeatureCollection>>await this.httpGetRequest(GEOJSON_ENDPOINT, params)
    return data
  }

  private async httpGetRequest(url: string, params?: IHttpParams): Promise<AxiosResponse | void> {
    try {
      return await this._httpService.getRequest(url, { params })
    } catch (err) {
      this._logService.consoleError(`HTTP GET ${url} Request Failed:\n`, err)
    }
  }
}
