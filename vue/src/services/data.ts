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

  loadData(): void {
    this.getHexagonData()
    this.getMapData()
  }

  private getHexagonData(): void {
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

  private getMapData(): void {
    this._styleLayers.forEach((styleLayer: IStyleLayer, i: number): void => {
      this.getStyleLayers(styleLayer, i)
    })
    this._markers.forEach((marker: IMarker): void => {
      this.getMarkers(marker)
    })
  }

  private async getStyleLayers(styleLayer: IStyleLayer, i: number): Promise<void> {
    try {
      /* prettier-ignore */
      const { layer: { id } } = styleLayer
      const layer: FeatureCollection = await this.getFeatureCollection(styleLayer)

      if (layer?.features?.length) {
        const styleLayer: IStyleLayer = this._styleLayers[i].layer
        styleLayer.source.data = layer
        return this._styleLayerService.setStyleLayers(styleLayer)
      }
      console.log(`No ${id.toUpperCase()} Layer Found:\n`, layer)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }

  private async getMarkers(marker: IMarker): Promise<void> {
    try {
      const { table: id } = marker
      const markers: FeatureCollection = await this.getFeatureCollection(marker)

      if (markers?.features?.length) {
        return this._markerService.setMarkers(markers, id)
      }
      console.log(`No ${id.toUpperCase()} Markers Found:\n`, marker)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }

  private async getFeatureCollection({
    fields,
    table
  }: IMarker | IStyleLayer): Promise<FeatureCollection> {
    const params: IHttpParams = { fields, table }
    const { GEOJSON_ENDPOINT } = this._endPoints
    const { data } = await this._http.get(GEOJSON_ENDPOINT, { params })
    return data
  }
}
