/*
 * URL: https://gist.github.com/Pessimistress/1a4f3f5eb3b882ab4dd29f8ac122a7be
 * Title: deck.gl + Mapbox HexagonLayer Example
 * Author: Xiaoji Chen (@pessimistress)
 * Data URL: https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv
 * Data Source: https://data.gov.uk
 */
import cloneDeep from 'lodash/cloneDeep'
/* @ts-ignore */
import { HexagonLayer } from '@deck.gl/aggregation-layers'
/* @ts-ignore */
import { Deck, ViewState } from '@deck.gl/core'
import mapboxgl, { Map, MapboxOptions } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import {
  IHexagonOptions,
  IHexagonParams,
  IHexagonProps,
  IHexagonSettings,
  IModal,
  IStore
} from '@/interfaces'
import { DataService, MarkerService } from '@/services'
import { store } from '@/store'
import { deckgl } from '@/config'
const { hexagonOptions, hexagonParams, hexagonProps, hexagonSettings } = deckgl

@Service()
export default class HexagonService {
  private _hexagonOptions: IHexagonOptions = hexagonOptions
  private _hexagonInitialParams: IHexagonParams = hexagonParams
  private _hexagonParams: IHexagonParams = hexagonParams
  private _hexagonProps: IHexagonProps = hexagonProps
  private _hexagonSettings: IHexagonSettings = hexagonSettings
  private _store: IStore = store

  constructor(
    public map: Map,
    private _data: number[][],
    private _dataService: DataService,
    private _markerService: MarkerService,
    private _hexagonLayer: HexagonLayer,
    private _deck: Deck
  ) {
    this._dataService = Container.get(DataService)
    this._markerService = Container.get(MarkerService)
    // this._hexagonInitialSettings = hexagonSettings
    // this._hexagonOptions = hexagonOptions
    // this._hexagonInitialParams = hexagonParams
    // this._hexagonParams = hexagonParams
    // this._hexagonProps = hexagonProps
    // this._hexagonSettings = hexagonSettings
    // this._store = store
  }

  async loadMap(): Promise<void> {
    !mapboxgl.accessToken && (await this._dataService.getMapboxAccessToken())

    // this._hexagonSettings = cloneDeep(this._store.getters.getHexagonSettingsState())
    const options: MapboxOptions = { ...this._hexagonOptions, ...this._hexagonSettings }
    this.map = new Map(options).on('load', (): void => {
      this._data = this._dataService.hexagonData
      this.showMarkers()
      this.setHexagonLayer()
    })
  }

  setHexagonLayer(): void {
    const { canvas, maxZoom, minZoom } = this._hexagonOptions
    this._hexagonLayer = new HexagonLayer({
      // id,
      // colorRange,
      // coverage,
      data: this._data,
      // elevationRange,
      // elevationScale,
      // extruded,
      getPosition: (d: Record<string, number>): Record<string, number> => d,
      // material,
      // opacity,
      // pickable: true,
      // radius,
      // upperPercentile
      ...this._hexagonParams,
      ...this._hexagonProps
      // Interactive props
      // autoHighlight: true,
      // onClick: (info: any) =>
      //   info.object &&
      //   alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
    })
    this._deck = new Deck({
      canvas,
      controller: { inertia: true, touchRotate: true },
      initialViewState: { ...this._hexagonSettings, maxZoom, minZoom },
      onViewStateChange: ({
        // viewState,
        viewState: { bearing, latitude, longitude, pitch, zoom }
      }: ViewState): void => {
        // const { bearing, latitude, longitude, pitch, zoom } = viewState
        // this.setHexagonSettings(viewState)
        this.map.jumpTo({
          bearing,
          center: { lng: longitude, lat: latitude },
          pitch,
          zoom
        })
      },
      layers: [this._hexagonLayer]
    })

    // deck.setProps({
    //   layers: [this._hexagonLayer]
    // })
    this.showModal()
  }

  // const { canvas, controller, maxZoom, minZoom } = this._hexagonOptions
  // const { coverage, elevationScale, radius, upperPercentile } = this._hexagonParams
  // const { colorRange, elevationRange, extruded, id, material, opacity } = this._hexagonProps
  // const { bearing, latitude, longitude, pitch, zoom } = this._hexagonSettings
  // const data: number[][] = this._dataService.hexagonData
  // this._hexagonLayer = new Deck({
  //   canvas,
  //   controller,
  //   initialViewState: { ...this._hexagonSettings, maxZoom, minZoom },
  //   onViewStateChange: ({
  //     viewState,
  //     viewState: { bearing, latitude, longitude, pitch, zoom }
  //   }: ViewState): void => {
  //     // const { bearing, latitude, longitude, pitch, zoom } = viewState
  //     // this.setHexagonSettings(viewState)
  //     this.map.jumpTo({
  //       bearing,
  //       center: { lng: longitude, lat: latitude },
  //       pitch,
  //       zoom
  //     })
  //   },
  //   layers: [
  //     new this._HexagonLayer({
  //       // id,
  //       // colorRange,
  //       // coverage,
  //       data: this._data,
  //       // elevationRange,
  //       // elevationScale,
  //       // extruded,
  //       getPosition: (d: Record<string, number>): Record<string, number> => d,
  //       // material,
  //       // opacity,
  //       // pickable: true,
  //       // radius,
  //       // upperPercentile

  //       ...this._hexagonParams,
  //       ...this._hexagonProps
  //       // Interactive props

  //       // autoHighlight: true,
  //       // onClick: (info: any) =>
  //       //   info.object &&
  //       //   alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
  //     })
  //   ]
  // })
  // this.showModal()
  // }

  setHexagonParams({ id, value }: HTMLInputElement): void {
    this._store.setters.setHexagonParamsState(id, +value)
    // Object.keys(this._hexagonParams).forEach((param: string): void => {
    /* @ts-ignore */
    // document.getElementById(param).oninput = (evt: any): void => {
    // evt?.target?.value && this._store.setters.setHexagonParamsState(param, +evt.target.value)
    // this._hexagonLayer.setProps({ [param]: +evt.target.value })
    // this._deck.setProps({ layers: [this._hexagonLayer], [param]: +evt.target.value })
  }
  //   })
  // }

  resetHexagonParams(): void {
    Object.keys(this._hexagonParams).forEach((param: string): void => {
      this._store.setters.setHexagonParamsState(
        param,
        this._hexagonInitialParams[param as keyof IHexagonParams]
      )
      this._hexagonLayer.setProps({
        [param]: this._hexagonInitialParams[param as keyof IHexagonParams]
      })
    })
  }

  resetHexagonSettings(): void {
    const { bearing, center, pitch, zoom } = this._hexagonSettings
    this.map.setBearing(bearing)
    this.map.setCenter(center)
    this.map.setPitch(pitch)
    this.map.setZoom(zoom)
    this.setHexagonSettingsState(this._hexagonSettings)
  }

  // private setHexagonSettings({ bearing, latitude, longitude, pitch, zoom }: ViewState): void {
  //   const lat: number = +latitude.toFixed(6)
  //   const lng: number = +longitude.toFixed(6)
  //   const center: LngLatLike = { lng, lat }
  //   const settings: IHexagonSettings = {
  //     bearing: +bearing.toFixed(1),
  //     center,
  //     latitude: lat,
  //     longitude: lng,
  //     pitch: +pitch.toFixed(1),
  //     zoom: +zoom.toFixed(1)
  //   }
  //   this.setHexagonSettingsState(settings)
  // }

  private setHexagonSettingsState(settings: IHexagonSettings): void {
    this._hexagonSettings = { ...settings }
    this._store.setters.setHexagonSettingsState(this._hexagonSettings)
  }

  private showMarkers(): void {
    setTimeout((): void => this._markerService.showMarkers(), 0.5)
  }

  private showModal(): void {
    const modal: IModal = cloneDeep(store.getters.getModalState())
    modal.show && setTimeout((): void => this._store.setters.setModalState(), 0.5)
  }
}

// private _hexagonInitialSettings: IHexagonSettings,
// private _hexagonInitialParams: IHexagonParams,
// private _hexagonOptions: IHexagonOptions, // private _hexagonParams: IHexagonParams,
// private _hexagonProps: IHexagonProps,
// private _hexagonSettings: IHexagonSettings,
// private _store: IStore
