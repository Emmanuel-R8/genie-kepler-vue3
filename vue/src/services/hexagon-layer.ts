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
import { IHexagonLayerProps, IHexagonLayerStaticProps } from '@/interfaces'
import { DataService, DeckService, MapboxService, StateService } from '@/services'

@Service()
export default class HexagonLayerService {
  private _hexagonLayerData: number[][] = []
  private _reactiveProps: IHexagonLayerProps = hexagonLayer.reactiveProps
  private _staticProps: IHexagonLayerStaticProps = hexagonLayer.staticProps
  private _states: Record<string, string> = States

  constructor(
    private _dataService: DataService,
    private _deckService: DeckService,
    private _mapboxService: MapboxService,
    private _stateService: StateService
  ) {
    this._dataService = Container.get(DataService)
    this._deckService = Container.get(DeckService)
    this._mapboxService = Container.get(MapboxService)
    this._stateService = Container.get(StateService)
  }

  get state(): IHexagonLayerProps {
    const { HEXAGON_LAYER_PROPS } = this._states
    return <IHexagonLayerProps>this._stateService.getReactiveState(HEXAGON_LAYER_PROPS)
  }

  private set _state(props: IHexagonLayerProps) {
    const { HEXAGON_LAYER_PROPS } = this._states
    this._stateService.setReactiveState(HEXAGON_LAYER_PROPS, props)
  }

  async loadHexagonLayer(): Promise<void> {
    const { accessToken } = this._mapboxService
    !accessToken && (await this._mapboxService.getAccessToken())
    this._deckService.loadDeckgl()
    this._deckService.loadMapbox()
    this._deckService.map.on('load', (): void => {
      this.onMapLoadHandler()
    })
  }

  onMapLoadHandler(): void {
    this.renderHexagonLayer()
  }

  setHexagonLayerPropsState(prop: string, value: string): void {
    const state = this.state
    state[prop as keyof IHexagonLayerProps] = Number(value)
    this._state = state
    this.renderHexagonLayer()
  }

  resetHexagonLayerPropsState(): void {
    this._state = this._reactiveProps
    this.renderHexagonLayer()
  }

  private renderHexagonLayer(): void {
    !this._hexagonLayerData?.length && this.setHexagonLayerData()
    const { deck } = this._deckService
    const hexagonLayer = new HexagonLayer({
      data: this._hexagonLayerData,
      getPosition: (d: number[]): number[] => d,
      ...this._staticProps,
      ...this.state
    })
    deck.setProps({ layers: [hexagonLayer] })
  }

  private setHexagonLayerData(): void {
    const { hexagonLayerData } = this._dataService
    this._hexagonLayerData = hexagonLayerData
  }
}
