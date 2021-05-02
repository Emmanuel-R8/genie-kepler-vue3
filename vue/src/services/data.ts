import * as fetch from 'd3-fetch'
import mapboxgl from 'mapbox-gl'
import { FeatureCollection } from 'geojson'
import { Container, Service } from 'typedi'

import { markers, style_layers } from '@/config'
import { EndPoints, Urls } from '@/enums'
import { HttpParams, Marker, StyleLayer } from '@/interfaces'
import { HttpService, MarkerService, StyleLayerService } from '@/services'

@Service()
export default class DataService {
  constructor(
    public hexagonData: any[],
    private _endPoints: Record<string, string>,
    private _http: HttpService,
    private _markerService: MarkerService,
    private _markers: any[],
    private _styleLayers: any[],
    private _styleLayerService: StyleLayerService,
    private _urls: Record<string, string>
  ) {
    this._endPoints = EndPoints
    this._http = Container.get(HttpService)
    this._markerService = Container.get(MarkerService)
    this._markers = markers
    this._styleLayers = style_layers
    this._styleLayerService = Container.get(StyleLayerService)
    this._urls = Urls
  }

  async getMapboxAccessToken(): Promise<void> {
    try {
      const { MAPBOX_ACCESS_TOKEN_ENDPOINT } = this._endPoints
      const { data } = await this._http.get(MAPBOX_ACCESS_TOKEN_ENDPOINT)

      if (data && <Record<string, string>>data) {
        const { token } = data
        mapboxgl.accessToken = token
        return
      }
      console.log(`No Mapbox Access Token Found:\n`, data)
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
    this._styleLayers.forEach((layer: StyleLayer, i: number): void => {
      this.getStyleLayers(layer, i)
    })
    this._markers.forEach((marker: Marker): void => {
      this.getMarkers(marker)
    })
  }

  private async getStyleLayers(layer: StyleLayer, i: number): Promise<void> {
    try {
      /* prettier-ignore */
      const { layer: { id } } = layer
      const fc: FeatureCollection = await this.getFeatureCollection(layer)

      if (fc?.features?.length) {
        const layer: StyleLayer = this._styleLayers[i].layer
        layer.source.data = fc
        return this._styleLayerService.setStyleLayers(layer)
      }
      console.log(`No ${id.toUpperCase()} Layer Found:\n`, fc)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }

  private async getMarkers(marker: Marker): Promise<void> {
    try {
      const { table } = marker
      const markers: FeatureCollection = await this.getFeatureCollection(marker)

      if (markers?.features?.length) {
        return this._markerService.setMarkers(markers, table)
      }
      console.log(`No ${table.toUpperCase()} Markers Found:\n`, marker)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }

  private async getFeatureCollection(feature: Marker | StyleLayer): Promise<FeatureCollection> {
    /* prettier-ignore */
    const { fields, table } = feature
    const params: HttpParams = { fields, table }
    const { GEOJSON_ENDPOINT } = this._endPoints
    const { data } = await this._http.get(GEOJSON_ENDPOINT, { params })
    return data
  }
}
