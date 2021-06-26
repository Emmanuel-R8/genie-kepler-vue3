import { csv } from 'd3-fetch'
import { Feature, FeatureCollection } from 'geojson'
import { Container, Service } from 'typedi'

import { layer, markers } from '@/config'
import { EndPoints, Urls } from '@/enums'
import { IHttpParams, ILayer, IMarker } from '@/interfaces'
import { HttpService, LayerService, LogService, MarkerService } from '@/services'

@Service()
export default class DataService {
  private _endPoints: Record<string, string> = EndPoints
  private _hexagonLayerData: number[][] = []
  private _layers: ILayer[] = layer
  private _markers: IMarker[] = markers
  private _urls: Record<string, string> = Urls

  constructor(
    private _httpService: HttpService,
    private _layerService: LayerService,
    private _logService: LogService,
    private _markerService: MarkerService
  ) {
    this._httpService = Container.get(HttpService)
    this._layerService = Container.get(LayerService)
    this._logService = Container.get(LogService)
    this._markerService = Container.get(MarkerService)
  }

  get hexagonLayerData(): number[][] {
    return this._hexagonLayerData
  }

  async loadData(): Promise<void> {
    await this.getHexagonLayerData()
    await this.getMapLayerData()
  }

  private async getHexagonLayerData(): Promise<void> {
    try {
      const { HEXAGON_LAYER_DATA_URL } = this._urls
      const data = await csv(HEXAGON_LAYER_DATA_URL)
      data?.length
        ? this.setHexagonLayerData(data)
        : this._logService.printConsoleLog(`No ${this.getHexagonLayerData.name} Found:\n`, data)
    } catch (err) {
      this._logService.printConsoleError(`${this.getHexagonLayerData.name} Fetch Failed:\n`, err)
    }
  }

  private setHexagonLayerData(data: Record<string, any>[]): void {
    this._hexagonLayerData = data.map((d: Record<string, string>): number[] => [+d.lng, +d.lat])
  }

  private async getMapLayerData(): Promise<void> {
    for (const layer of this._layers) {
      await this.getLayerFeatures(layer)
    }
    for (const marker of this._markers) {
      await this.getMarkerFeatures(marker)
    }
  }

  private async getLayerFeatures(layer: ILayer): Promise<void> {
    try {
      const { id } = layer
      const fc = await this.getGeoJsonFeatureCollection(layer)
      fc?.features?.length
        ? this.setLayer(fc, layer)
        : this._logService.printConsoleLog(`No ${id.toUpperCase()} Found:\n`, fc)
    } catch (err) {
      this._logService.printConsoleError(`${this.getLayerFeatures.name} Http Failed:\n`, err)
    }
  }

  private setLayer(fc: FeatureCollection, layer: ILayer): void {
    layer.source.data = fc
    this._layerService.setLayer(layer)
  }

  private async getMarkerFeatures(marker: IMarker): Promise<void> {
    try {
      const { id } = marker
      const { features } = await this.getGeoJsonFeatureCollection(marker)
      features?.length
        ? this.setMarker(id, features)
        : this._logService.printConsoleLog(`No ${id.toUpperCase()} Found:\n`, features)
    } catch (err) {
      this._logService.printConsoleError(`${this.getMarkerFeatures.name} Http Failed:\n`, err)
    }
  }

  private setMarker(id: string, features: Feature[]): void {
    this._markerService.setMarker(id, features)
  }

  private async getGeoJsonFeatureCollection({
    id,
    fields
  }: ILayer | IMarker): Promise<FeatureCollection> {
    const { GEOJSON_ENDPOINT } = this._endPoints
    const params: IHttpParams = { fields, table: id.replace(/-(.*)$/, '') }
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const { data } = await this._httpService.get(GEOJSON_ENDPOINT, { params })
    return <FeatureCollection>data
  }
}
