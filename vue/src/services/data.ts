import * as fetch from 'd3-fetch'
import mapboxgl from 'mapbox-gl'
import { FeatureCollection } from 'geojson'
import { Container, Service } from 'typedi'

import { layers, markers } from '@/config'
import { EndPoints, Urls } from '@/enums'
import { HttpParams, Layer, Marker } from '@/interfaces'
import { HttpService, LayerService, MarkerService } from '@/services'

@Service()
export default class DataService {
  constructor(
    public hexagonData: any[],
    private _layers: any[],
    private _markers: any[],
    private _endPoints: Record<string, string>,
    private _urls: Record<string, string>,
    private _http: HttpService,
    private _layerService: LayerService,
    private _markerService: MarkerService
  ) {
    this._layers = layers
    this._markers = markers
    this._endPoints = EndPoints
    this._urls = Urls
    this._http = Container.get(HttpService)
    this._layerService = Container.get(LayerService)
    this._markerService = Container.get(MarkerService)
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
      this.getLayers(layer, i)
    })
    this._markers.forEach((marker: Marker): void => {
      this.getMarkers(marker)
    })
  }

  private async getLayers(layer: Layer, i: number): Promise<void> {
    try {
      // prettier-ignore
      const { layer: { id } } = layer
      const fc: FeatureCollection = await this.getGeoJsonFeatureCollection(layer)

      if (fc?.features?.length) {
        const layer: Layer = this._layers[i].layer
        layer.source.data = fc
        return this._layerService.setLayers(layer)
      }
      return console.log(`No ${id.toUpperCase()} Layer Found:\n`, fc)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }

  private async getMarkers(marker: Marker): Promise<void> {
    try {
      // prettier-ignore
      const { layer: { id } } = marker
      const markers: FeatureCollection = await this.getGeoJsonFeatureCollection(marker)

      if (markers?.features?.length) {
        return this._markerService.setMarkers(markers, id)
      }
      return console.log(`No ${id.toUpperCase()} Markers Found:\n`, marker)
    } catch (err: any) {
      console.error('Http Failed:\n', err)
    }
  }

  private async getGeoJsonFeatureCollection(element: Layer | Marker): Promise<FeatureCollection> {
    // prettier-ignore
    const { fields, layer: { id } } = element
    const params: HttpParams = { fields, table: id }
    const { GEOJSON_ENDPOINT } = this._endPoints
    const { data } = await this._http.get(GEOJSON_ENDPOINT, { params })
    return data
  }
}
