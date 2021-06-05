import * as fetch from 'd3-fetch'
import mapboxgl from 'mapbox-gl'
import { Feature, FeatureCollection } from 'geojson'
import { Container, Service } from 'typedi'

import { markers, styleLayers } from '@/config'
import { EndPoints, Urls } from '@/enums'
import { IHttpParams, IMarker, IStyleLayer } from '@/interfaces'
import { HttpService, MarkerService, StyleLayerService } from '@/services'

@Service()
export default class DataService {
  private _endPoints: Record<string, string> = EndPoints
  private _hexagonLayerData: number[][] = []
  private _markers: IMarker[] = markers
  private _styleLayers: any[] = styleLayers
  private _urls: Record<string, string> = Urls

  constructor(
    private _httpService: HttpService,
    private _markerService: MarkerService,
    private _styleLayerService: StyleLayerService
  ) {
    this._httpService = Container.get(HttpService)
    this._markerService = Container.get(MarkerService)
    this._styleLayerService = Container.get(StyleLayerService)
  }

  get hexagonLayerData(): number[][] {
    return this._hexagonLayerData
  }

  loadData(): void {
    this.getHexagonLayerData()
    this.getMapLayerData()
  }

  async getMapboxAccessToken(): Promise<void> {
    try {
      const { MAPBOX_ACCESS_TOKEN_ENDPOINT } = this._endPoints
      /* prettier-ignore */
      const { data: { token } } = await this._httpService.get(MAPBOX_ACCESS_TOKEN_ENDPOINT)
      token && <string>token
        ? this.setMapboxAccessToken(token)
        : this.printConsoleLog(`No Mapbox Access Token Found:\n`, token)
    } catch (err: any) {
      this.printConsoleError(`${this.getMapboxAccessToken.name} Http Failed:\n`, err)
    }
  }

  private setMapboxAccessToken(token: string): void {
    mapboxgl.accessToken = token
  }

  private getHexagonLayerData(): void {
    const { HEXAGON_LAYER_DATA_URL } = this._urls
    fetch
      .csv(HEXAGON_LAYER_DATA_URL)
      .then((data: any[]): void => {
        data?.length
          ? this.setHexagonLayerData(data)
          : this.printConsoleError(`${this.getHexagonLayerData.name} Data Error:\n`, data)
      })
      .catch((err: Error): void => {
        this.printConsoleError(`${this.getHexagonLayerData.name} Fetch Failed:\n`, err)
      })
  }

  private setHexagonLayerData(data: any[]): void {
    this._hexagonLayerData = data.map((d: Record<string, string>): number[] => [+d.lng, +d.lat])
  }

  private getMapLayerData(): void {
    for (const styleLayer of this._styleLayers) {
      this.getStyleLayers(styleLayer)
    }
    for (const marker of this._markers) {
      this.getMarkers(marker)
    }
  }

  private async getStyleLayers(styleLayer: IStyleLayer): Promise<void> {
    try {
      const { id } = styleLayer
      const fc = await this.getGeoJsonFeatureCollection(styleLayer)
      fc?.features?.length
        ? this.setStyleLayers(fc, styleLayer)
        : this.printConsoleLog(`No ${id.toUpperCase()} Layer Found:\n`, fc)
    } catch (err: any) {
      this.printConsoleError(`${this.getStyleLayers.name} Http Failed:\n`, err)
    }
  }

  private setStyleLayers(fc: FeatureCollection, styleLayer: IStyleLayer): void {
    styleLayer.source.data = fc
    this._styleLayerService.setStyleLayers(styleLayer)
  }

  private async getMarkers(marker: IMarker): Promise<void> {
    try {
      const { id } = marker
      const { features } = await this.getGeoJsonFeatureCollection(marker)
      features?.length
        ? this.setMarkers(id, features)
        : this.printConsoleLog(`No ${id.toUpperCase()} Markers Found:\n`, features)
    } catch (err: any) {
      this.printConsoleError(`${this.getMarkers.name} Http Failed:\n`, err)
    }
  }

  private setMarkers(id: string, features: Feature[]): void {
    this._markerService.setMarkers(id, features)
  }

  private async getGeoJsonFeatureCollection({
    id,
    fields
  }: IMarker | IStyleLayer): Promise<FeatureCollection> {
    const { GEOJSON_ENDPOINT } = this._endPoints
    const params: IHttpParams = { fields, table: id.replace(/-(.*)$/, '') }
    const { data: fc } = await this._httpService.get(GEOJSON_ENDPOINT, { params })
    return fc
  }

  private printConsoleError(message: string, err: any): void {
    console.error(message, err)
  }

  private printConsoleLog(message: string, data: any): void {
    console.log(message, data)
  }
}
