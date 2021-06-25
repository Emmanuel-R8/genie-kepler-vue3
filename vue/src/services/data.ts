import { csv } from 'd3-fetch'
import { Feature, FeatureCollection } from 'geojson'
import { Container, Service } from 'typedi'

import { markers, styleLayer } from '@/config'
import { EndPoints, Urls } from '@/enums'
import { IHttpParams, IMarker, IStyleLayer } from '@/interfaces'
import { HttpService, LogService, MarkerService, StyleLayerService } from '@/services'

@Service()
export default class DataService {
  private _endPoints: Record<string, string> = EndPoints
  private _hexagonLayerData: number[][] = []
  private _markers: IMarker[] = markers
  private _styleLayers: IStyleLayer[] = styleLayer
  private _urls: Record<string, string> = Urls

  constructor(
    private _httpService: HttpService,
    private _logService: LogService,
    private _markerService: MarkerService,
    private _styleLayerService: StyleLayerService
  ) {
    this._httpService = Container.get(HttpService)
    this._logService = Container.get(LogService)
    this._markerService = Container.get(MarkerService)
    this._styleLayerService = Container.get(StyleLayerService)
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
    for (const styleLayer of this._styleLayers) {
      await this.getStyleLayers(styleLayer)
    }
    for (const marker of this._markers) {
      await this.getMarkers(marker)
    }
  }

  private async getStyleLayers(styleLayer: IStyleLayer): Promise<void> {
    try {
      const { id } = styleLayer
      const fc = await this.getGeoJsonFeatureCollection(styleLayer)
      fc?.features?.length
        ? this.setStyleLayers(fc, styleLayer)
        : this._logService.printConsoleLog(`No ${id.toUpperCase()} Layer Found:\n`, fc)
    } catch (err) {
      this._logService.printConsoleError(`${this.getStyleLayers.name} Http Failed:\n`, err)
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
        : this._logService.printConsoleLog(`No ${id.toUpperCase()} Markers Found:\n`, features)
    } catch (err) {
      this._logService.printConsoleError(`${this.getMarkers.name} Http Failed:\n`, err)
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
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const { data } = await this._httpService.get(GEOJSON_ENDPOINT, { params })
    return <FeatureCollection>data
  }
}
