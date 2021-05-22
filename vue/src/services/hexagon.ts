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
import { IHexagonLayerReactiveProps, IHexagonLayerStaticProps } from '@/interfaces'
import { DataService, DeckService, MarkerService, ModalService, StoreService } from '@/services'

@Service()
export default class HexagonService {
  private _reactiveProps: IHexagonLayerReactiveProps = hexagonLayer.reactiveProps
  private _staticProps: IHexagonLayerStaticProps = hexagonLayer.staticProps

  constructor(
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

    this._deckService.loadMapbox()
    this._deckService.loadDeckgl()
    this._deck = this._deckService.deck
    this._map = this._deckService.map
    this._map.on('load', (): void => {
      this.hideModal()
      this.showMarkers()
      this.renderHexagonLayer()
    })
  }

  renderHexagonLayer(): void {
    const data: number[][] = this._dataService.hexagonLayerData
    if (data) {
      const reactiveProps: IHexagonLayerReactiveProps =
        this._storeService.getHexagonLayerReactivePropsState()
      const hexagonLayer: HexagonLayer = new HexagonLayer({
        data,
        getPosition: (d: Record<string, number>): Record<string, number> => d,
        ...this._staticProps,
        ...reactiveProps
      })
      this._deck.setProps({ layers: [hexagonLayer] })
    }
  }

  resetHexagonLayerReactiveProps(): void {
    this._storeService.resetHexagonLayerReactivePropsState(this._reactiveProps)
    this.renderHexagonLayer()
  }

  private hideModal(): void {
    this._modalService.hideModal(0.5)
  }

  private showMarkers(): void {
    setTimeout((): void => this._markerService.showMarkers(), 0.5)
  }
}
