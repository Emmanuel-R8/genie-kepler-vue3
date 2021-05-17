/*
 * URL: https://deck.gl/gallery/hexagon-layer
 * Title: deck.gl HexagonLayer Example
 * Data URL: https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv
 * Data Source: https://data.gov.uk
 */
import cloneDeep from 'lodash/cloneDeep'
/* @ts-ignore */
import { HexagonLayer } from '@deck.gl/aggregation-layers'
/* @ts-ignore */
import { Deck, ViewState } from '@deck.gl/core'
import mapboxgl, { LngLatLike, Map, MapboxOptions } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { deckgl } from '@/config'
import { IHexagonAttributes, IHexagonOptions, IHexagonProps, IHexagonSettings } from '@/interfaces'
import { DataService, MarkerService, ModalService, StoreService } from '@/services'

const { hexagonAttributes, hexagonOptions, hexagonProps, hexagonSettings } = deckgl

@Service()
export default class HexagonService {
  private _hexagonAttributes: IHexagonAttributes = hexagonAttributes
  private _hexagonInitialParams: IHexagonAttributes = hexagonAttributes
  private _hexagonOptions: IHexagonOptions = hexagonOptions
  private _hexagonProps: IHexagonProps = hexagonProps
  private _hexagonSettings: IHexagonSettings = hexagonSettings

  constructor(
    public map: Map,
    private _data: number[][],
    private _deck: Deck,
    private _hexagonLayer: HexagonLayer,
    private _dataService: DataService,
    private _markerService: MarkerService,
    private _modalService: ModalService,
    private _storeService: StoreService
  ) {
    this._dataService = Container.get(DataService)
    this._markerService = Container.get(MarkerService)
    this._modalService = Container.get(ModalService)
    this._storeService = Container.get(StoreService)
  }

  async loadMap(): Promise<void> {
    !mapboxgl.accessToken && (await this._dataService.getMapboxAccessToken())

    this._hexagonSettings = cloneDeep(this._storeService.getHexagonSettingsState())
    const options: MapboxOptions = { ...this._hexagonOptions, ...this._hexagonSettings }
    this.map = new Map(options).on('load', (): void => {
      this._data = this._dataService.hexagonData
      this.showMarkers()
      this.setHexagonLayer()
    })
  }

  setHexagonLayer(): void {
    const { canvas, controller, maxZoom, minZoom } = this._hexagonOptions
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
      ...this._hexagonAttributes,
      ...this._hexagonProps
      // Interactive props
      // autoHighlight: true,
      // onHover: (info: any) =>
      //   info.object &&
      //   alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
    })
    this._deck = new Deck({
      canvas,
      controller,
      initialViewState: { ...this._hexagonSettings, maxZoom, minZoom },
      onViewStateChange: ({
        viewState,
        viewState: { bearing, latitude, longitude, pitch, zoom }
      }: ViewState): void => {
        this.setHexagonSettings(viewState)
        this.map.jumpTo({
          bearing,
          center: { lng: longitude, lat: latitude },
          pitch,
          zoom
        })
      },
      layers: [this._hexagonLayer]
    })

    this._deck.setProps({
      layers: [this._hexagonLayer]
    })
    this.hideModal()
  }

  // const { canvas, controller, maxZoom, minZoom } = this._hexagonOptions
  // const { coverage, elevationScale, radius, upperPercentile } = this._hexagonAttributes
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

  //       ...this._hexagonAttributes,
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

  setHexagonAttributes({ id, value }: HTMLInputElement): void {
    this._storeService.setHexagonAttributesState(id, +value)
    // Object.keys(this._hexagonAttributes).forEach((param: string): void => {
    /* @ts-ignore */
    // document.getElementById(param).oninput = (evt: any): void => {
    // evt?.target?.value && this._store.setters.setHexagonAttributesState(param, +evt.target.value)
    // this._hexagonLayer.setProps({ [param]: +evt.target.value })
    // this._deck.setProps({ layers: [this._hexagonLayer], [param]: +evt.target.value })
  }
  //   })
  // }

  resetHexagonAttributes(): void {
    Object.keys(this._hexagonAttributes).forEach((attribute: string): void => {
      this._storeService.setHexagonAttributesState(
        attribute,
        this._hexagonInitialParams[attribute as keyof IHexagonAttributes]
      )
      this._hexagonLayer.setProps({
        [attribute]: this._hexagonInitialParams[attribute as keyof IHexagonAttributes]
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

  private setHexagonSettings({ bearing, latitude, longitude, pitch, zoom }: ViewState): void {
    latitude = +latitude.toFixed(6)
    longitude = +longitude.toFixed(6)
    const center: LngLatLike = { lng: longitude, lat: latitude }
    const settings: IHexagonSettings = {
      bearing: +bearing.toFixed(1),
      center,
      latitude,
      longitude,
      pitch: +pitch.toFixed(1),
      zoom: +zoom.toFixed(1)
    }
    this.setHexagonSettingsState(settings)
  }

  private setHexagonSettingsState(settings: IHexagonSettings): void {
    this._hexagonSettings = { ...settings }
    this._storeService.setHexagonSettingsState(this._hexagonSettings)
  }

  private showMarkers(): void {
    setTimeout((): void => this._markerService.showMarkers(), 0.5)
  }

  private hideModal(): void {
    this._modalService.hideModal(0.5)
  }
}
