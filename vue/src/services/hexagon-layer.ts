/*
 * URL: https://deck.gl/gallery/hexagon-layer
 * Title: deck.gl HexagonLayer Example
 * Data URL: https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv
 * Data Source: https://data.gov.uk
 */

/* eslint-disable */
/* @ts-ignore */
import { HexagonLayer } from '@deck.gl/aggregation-layers'
/* @ts-ignore */
import { Deck } from '@deck.gl/core'
import mapboxgl, { Map } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { hexagonLayer } from '@/config'
import { States } from '@/enums'
import { IHexagonLayerReactiveProps, IHexagonLayerStaticProps } from '@/interfaces'
import { DataService, DeckService, MarkerService, StoreService } from '@/services'

@Service()
export default class HexagonLayerService {
  private _hexagonLayerData: number[][] = []
  private _reactiveProps: IHexagonLayerReactiveProps = hexagonLayer.reactiveProps
  private _staticProps: IHexagonLayerStaticProps = hexagonLayer.staticProps
  private _states: Record<string, string> = States

  constructor(
    private _deck: Deck,
    private _map: Map,
    private _dataService: DataService,
    private _deckService: DeckService,
    private _markerService: MarkerService,
    private _storeService: StoreService
  ) {
    this._dataService = Container.get(DataService)
    this._deckService = Container.get(DeckService)
    this._markerService = Container.get(MarkerService)
    this._storeService = Container.get(StoreService)
  }

  get map(): Map {
    return this._map
  }

  get state(): IHexagonLayerReactiveProps {
    const { HEXAGON_LAYER_REACTIVE_PROPS } = this._states
    return <IHexagonLayerReactiveProps>this._storeService.getState(HEXAGON_LAYER_REACTIVE_PROPS)
  }

  set state(props: IHexagonLayerReactiveProps) {
    const { HEXAGON_LAYER_REACTIVE_PROPS } = this._states
    this._storeService.setState(HEXAGON_LAYER_REACTIVE_PROPS, props)
  }

  async loadHexagonLayer(): Promise<void> {
    !mapboxgl.accessToken && (await this._dataService.getMapboxAccessToken())

    this._deckService.loadDeckgl()
    this._deck = this._deckService.deck

    this._deckService.loadMapbox()
    this._map = this._deckService.map
    this._map.on('load', (): void => {
      this.onMapLoadHandler()
    })
  }

  onMapLoadHandler(): void {
    this.showMarkers()
    this.renderHexagonLayer()
  }

  setHexagonLayerReactiveProps(prop: string, value: string): void {
    const state: IHexagonLayerReactiveProps = this.state
    state[prop as keyof IHexagonLayerReactiveProps] = +value
    this.state = state
    this.renderHexagonLayer()
  }

  resetHexagonLayerReactiveProps(): void {
    this.state = this._reactiveProps
    this.renderHexagonLayer()
  }

  private renderHexagonLayer(): void {
    !this._hexagonLayerData.length && this.setHexagonLayerData()
    const hexagonLayer = new HexagonLayer({
      data: this._hexagonLayerData,
      getPosition: (d: number[]): number[] => d,
      ...this._staticProps,
      ...this.state
    })
    this._deck.setProps({ layers: [hexagonLayer] })
  }

  private setHexagonLayerData(): void {
    this._hexagonLayerData = this._dataService.hexagonLayerData
  }

  private showMarkers(): void {
    this._markerService.showMarkers()
  }
}
