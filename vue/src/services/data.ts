import * as fetch from 'd3-fetch'
import mapboxgl from 'mapbox-gl'
import { FeatureCollection } from 'geojson'
import { Container, Service } from 'typedi'

import { markers, styleLayers } from '@/config'
import { EndPoints, Urls } from '@/enums'
import { IHttpParams, IMarker, IStyleLayer } from '@/interfaces'
import { HttpService, MarkerService, StyleLayerService } from '@/services'

@Service()
export default class DataService {
  private _data: number[][] = []
  private _endPoints: Record<string, string> = EndPoints
  private _markers: IMarker[] = markers
  private _styleLayers: any[] = styleLayers
  private _urls: Record<string, string> = Urls

  constructor(
    private _http: HttpService,
    private _markerService: MarkerService,
    private _styleLayerService: StyleLayerService
  ) {
    this._http = Container.get(HttpService)
    this._markerService = Container.get(MarkerService)
    this._styleLayerService = Container.get(StyleLayerService)
  }

  get hexagonLayerData(): number[][] {
    return this._data
  }

  async getMapboxAccessToken(): Promise<void> {
    try {
      const { MAPBOX_ACCESS_TOKEN_ENDPOINT } = this._endPoints
      /* prettier-ignore */
      const { data: { token } } = await this._http.get(MAPBOX_ACCESS_TOKEN_ENDPOINT)

      if (token && <Record<string, string>>token) {
        return (mapboxgl.accessToken = token)
      }
      console.log(`No Mapbox Access Token Found:\n`, token)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }

  loadData(): void {
    this.getHexagonLayerData()
    this.getMapLayerData()
  }

  private getHexagonLayerData(): void {
    const { HEXAGON_DATA_URL } = this._urls
    fetch
      .csv(HEXAGON_DATA_URL)
      .then((data: any[]): void => {
        data?.length
          ? (this._data = data.map((d: Record<string, string>): number[] => [+d.lng, +d.lat]))
          : console.error('Data Error:\n', data)
      })
      .catch((err: Error): void => {
        console.error('getHeatmapData Failed:\n', err)
      })
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
      /* prettier-ignore */
      const { fields, layer, layer: { id }, table } = styleLayer
      const fc = await this.getFeatureCollection({ fields, table })

      if (fc?.features?.length) {
        const styleLayer: any = layer
        styleLayer.source.data = fc
        return this._styleLayerService.setStyleLayers(styleLayer)
      }
      console.log(`No ${id.toUpperCase()} Layer Found:\n`, fc)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }

  private async getMarkers(marker: IMarker): Promise<void> {
    try {
      const { fields, table: id, table } = marker
      const { features } = await this.getFeatureCollection({ fields, table })

      if (features?.length) {
        return this._markerService.setMarkers(id, features)
      }
      console.log(`No ${id.toUpperCase()} Markers Found:\n`, features)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }

  private async getFeatureCollection({
    fields,
    table
  }: IMarker | IStyleLayer): Promise<FeatureCollection> {
    const { GEOJSON_ENDPOINT } = this._endPoints
    const params: IHttpParams = { fields, table }
    const { data: fc } = await this._http.get(GEOJSON_ENDPOINT, { params })
    return fc
  }
}
