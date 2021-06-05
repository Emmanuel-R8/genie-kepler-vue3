/*
 * URL: https://deck.gl/gallery/hexagon-layer
 * Title: deck.gl HexagonLayer Example
 * Data URL: https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv
 * Data Source: https://data.gov.uk
 */

/* @ts-ignore */
import { HexagonLayer } from '@deck.gl/aggregation-layers'
/* @ts-ignore */
import { Deck } from '@deck.gl/core'
import mapboxgl, { Map } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { hexagonLayer } from '@/config'
import { StoreStates } from '@/enums'
import { IHexagonLayerReactiveProps, IHexagonLayerStaticProps } from '@/interfaces'
import { DataService, DeckService, MarkerService, ModalService, StoreService } from '@/services'

@Service()
export default class HexagonLayerService {
  private _HEXAGON_LAYER_REACTIVE_PROPS: string = StoreStates.HEXAGON_LAYER_REACTIVE_PROPS
  private _reactiveProps: IHexagonLayerReactiveProps = hexagonLayer.reactiveProps
  private _staticProps: IHexagonLayerStaticProps = hexagonLayer.staticProps

  constructor(
    private _data: number[][],
    private _deck: Deck,
    private _map: Map,
    private _dataService: DataService,
    private _deckService: DeckService,
    private _markerService: MarkerService,
    private _modalService: ModalService,
    private _storeService: StoreService
  ) {
    this._dataService = Container.get(DataService)
    this._deckService = Container.get(DeckService)
    this._markerService = Container.get(MarkerService)
    this._modalService = Container.get(ModalService)
    this._storeService = Container.get(StoreService)
  }

  get map(): Map {
    return this._map
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
    this.hideModal()
    this.showMarkers()
    this.setHexagonLayerData()
    this.renderHexagonLayer()
  }

  renderHexagonLayer(): void {
    if (this._data) {
      const reactiveProps: IHexagonLayerReactiveProps = this._storeService.getState(
        this._HEXAGON_LAYER_REACTIVE_PROPS
      )
      const hexagonLayer: HexagonLayer = new HexagonLayer({
        data: this._data,
        getPosition: (d: Record<string, number>): Record<string, number> => d,
        ...this._staticProps,
        ...reactiveProps
      })
      this._deck.setProps({ layers: [hexagonLayer] })
    }
  }

  resetHexagonLayerReactiveProps(): void {
    this._storeService.setState(this._HEXAGON_LAYER_REACTIVE_PROPS, this._reactiveProps)
    this.renderHexagonLayer()
  }

  private hideModal(): void {
    this._modalService.hideModal(400)
  }

  private setHexagonLayerData(): void {
    this._data = this._dataService.hexagonLayerData
  }

  private showMarkers(): void {
    this._markerService.showMarkers()
  }
}
