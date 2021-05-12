/*
 * URL: https://gist.github.com/Pessimistress/1a4f3f5eb3b882ab4dd29f8ac122a7be
 * Title: deck.gl + Mapbox HexagonLayer Example
 * Author: Xiaoji Chen (@pessimistress)
 * Data URL: https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv
 * Data Source: https://data.gov.uk
 */
import cloneDeep from 'lodash/cloneDeep'
/* @ts-ignore */
// import { HexagonLayer } from '@deck.gl/aggregation-layers'
/* @ts-ignore */
// import { MapboxLayer } from '@deck.gl/mapbox'
import mapboxgl, { LngLatLike, Map, MapboxOptions, NavigationControl } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { deckgl } from '@/config'
import {
  IHexagonParams,
  IHexagonProps,
  IHexagonSettings,
  IMapOptions,
  IModal,
  IStore
} from '@/interfaces'
import { DataService } from '@/services'
import { store } from '@/store'

@Service()
export default class HexagonService {
  constructor(
    public map: Map,
    // private _data: any[],
    private _dataService: DataService,
    // private _HexagonLayer: HexagonLayer,
    private _hexagonInitialSettings: IHexagonSettings,
    // private _hexagonLayer: MapboxLayer,
    private _hexagonOptions: IMapOptions,
    private _hexagonParams: IHexagonParams,
    private _hexagonProps: IHexagonProps,
    private _hexagonSettings: IHexagonSettings,
    private _navigationControl: Record<string, any>,
    private _store: IStore
  ) {
    this._dataService = Container.get(DataService)
    // this._HexagonLayer = HexagonLayer
    this._hexagonInitialSettings = deckgl.hexagonSettings
    this._hexagonParams = deckgl.hexagonParams
    this._hexagonProps = deckgl.hexagonProps
    this._hexagonOptions = deckgl.hexagonOptions
    this._navigationControl = deckgl.navigationControl
    this._store = store
  }

  async loadMap(): Promise<void> {
    if (!mapboxgl.accessToken) {
      await this._dataService.getMapboxAccessToken()
    }

    const { position, visualizePitch } = this._navigationControl
    this._hexagonSettings = cloneDeep(this._store.getters.getHexagonSettingsState())
    const options: MapboxOptions = { ...this._hexagonOptions, ...this._hexagonSettings }
    this.map = new Map(options)
      .addControl(new NavigationControl({ visualizePitch }), position)
      .on('load', (): void => {
        const modal: IModal = cloneDeep(store.getters.getModalState())
        if (modal.show) {
          setTimeout((): void => this._store.setters.setModalState(), 0.5)
        }
        // this.setHexagonLayer()
      })
      .on('idle', (): void => {
        this.setHexagonSettings()
      })
  }

  // setHexagonLayer(): void {
  //   const {
  //     coverage,
  //     elevationScale,
  //     radius,
  //     upperPercentile
  //   }: IHexagonParams = this._hexagonParams
  //   const { colorRange, elevationRange, extruded, id, material, opacity } = this._hexagonProps
  //   const data: any[] = this._dataService.hexagonData
  //   this._hexagonLayer = new MapboxLayer({
  //     id,
  //     type: this._HexagonLayer,
  //     colorRange,
  //     coverage,
  //     data,
  //     elevationRange,
  //     elevationScale,
  //     extruded,
  //     getPosition: (d: Record<string, string>): number[] => [+d.lng, +d.lat],
  //     material,
  //     opacity,
  //     radius,
  //     upperPercentile
  //   })

  //   // this.setHexagonParams()
  //   this.addHexagonLayer()
  //   // this.map.addLayer(this._hexagonLayer)
  // }

  // setHexagonParams(evt: any): void {
  //   Reflect.ownKeys(this.state.heatmap.params).forEach((param): void => {
  //     document.getElementById(param as string).oninput = (evt: any): void => {
  //       this.eventEmitter.emit(['setHeatmapParams', param, +evt.target.value])
  //       this._hexagonLayer.setProps({ [param]: this.state.heatmap.params[param] })
  //     }
  //   })
  // }

  setHexagonSettings(): void {
    const lat: number = +this.map.getCenter().lat.toFixed(6)
    const lng: number = +this.map.getCenter().lng.toFixed(6)
    const center: LngLatLike = { lng, lat }
    const settings: IHexagonSettings = {
      bearing: +this.map.getBearing().toFixed(2),
      center,
      pitch: +this.map.getPitch().toFixed(2),
      zoom: +this.map.getZoom().toFixed(2)
    }
    this.setHexagonSettingsState(settings)
  }

  // resetHexagonParams(): void {
  //   Reflect.ownKeys(this.state.heatmap.params).forEach((param): void => {
  //     this.eventEmitter.emit(['setHeatmapParams', param, this.state.heatmap.props[param]])
  //     this._hexagonLayer.setProps({ [param]: this.state.heatmap.props[param] })
  //   })
  // }

  resetHexagonSettings(): void {
    const { bearing, center, pitch, zoom } = this._hexagonInitialSettings
    // const settings: IHexagonSettings = {
    //   bearing,
    //   center,
    //   pitch,
    //   zoom
    // }
    this.map.setBearing(bearing)
    this.map.setCenter(center)
    this.map.setPitch(pitch)
    this.map.setZoom(zoom)
    this.setHexagonSettingsState(this._hexagonInitialSettings)
  }

  private addHexagonLayer(): void {
    // this.map.addLayer(this._hexagonLayer)
    // this.setLayerVisibility()
  }

  // private setLayerVisibility() {
  //   this.eventEmitter.emit(['setSplashScreenActive'])
  //   this.map.setLayoutProperty(this.state.heatmap.id, 'visibility', 'visible')
  //   this._store.setters.setModalState()
  // }

  private setHexagonSettingsState(settings: IHexagonSettings): void {
    this._hexagonSettings = { ...settings }
    this._store.setters.setHexagonSettingsState(this._hexagonSettings)
  }
}
