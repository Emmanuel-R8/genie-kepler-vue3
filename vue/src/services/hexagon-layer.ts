/*
 * URL: https://deck.gl/gallery/hexagon-layer
 * Title: deck.gl HexagonLayer Example
 * Data URL: https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv
 * Data Source: https://data.gov.uk
 */

/* eslint-disable */
/* @ts-ignore */
import { HexagonLayer } from '@deck.gl/aggregation-layers'
import { Container, Service } from 'typedi'

import { hexagonLayer } from '@/config'
import { States } from '@/enums'
import { IHexagonLayerReactiveProps, IHexagonLayerStaticProps } from '@/interfaces'
import { DataService, DeckService, MapboxService, StoreService } from '@/services'

@Service()
export default class HexagonLayerService {
  private _hexagonLayerData: number[][] = []
  private _reactiveProps: IHexagonLayerReactiveProps = hexagonLayer.reactiveProps
  private _staticProps: IHexagonLayerStaticProps = hexagonLayer.staticProps
  private _states: Record<string, string> = States

  constructor(
    private _dataService: DataService,
    private _deckService: DeckService,
    private _mapboxService: MapboxService,
    private _storeService: StoreService
  ) {
    this._dataService = Container.get(DataService)
    this._deckService = Container.get(DeckService)
    this._mapboxService = Container.get(MapboxService)
    this._storeService = Container.get(StoreService)
  }

  get state(): IHexagonLayerReactiveProps {
    const { HEXAGON_LAYER_REACTIVE_PROPS } = this._states
    return <IHexagonLayerReactiveProps>this._storeService.getState(HEXAGON_LAYER_REACTIVE_PROPS)
  }

  private set _state(props: IHexagonLayerReactiveProps) {
    const { HEXAGON_LAYER_REACTIVE_PROPS } = this._states
    this._storeService.setState(HEXAGON_LAYER_REACTIVE_PROPS, props)
  }

  async loadHexagonLayer(): Promise<void> {
    !this._mapboxService.accessToken && (await this._mapboxService.getAccessToken())
    this._deckService.loadDeckgl()
    this._deckService.loadMapbox()
    this._deckService.map.on('load', (): void => {
      this.onMapLoadHandler()
    })
  }

  onMapLoadHandler(): void {
    this.renderHexagonLayer()
  }

  setHexagonLayerReactiveProps(prop: string, value: string): void {
    const props = this.state
    props[prop as keyof IHexagonLayerReactiveProps] = +value
    this._state = props
    this.renderHexagonLayer()
  }

  resetHexagonLayerReactiveProps(): void {
    this._state = this._reactiveProps
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
    this._deckService.deck.setProps({ layers: [hexagonLayer] })
  }

  private setHexagonLayerData(): void {
    this._hexagonLayerData = this._dataService.hexagonLayerData
  }
}
