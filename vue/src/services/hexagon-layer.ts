/*
 * URL: https://deck.gl/gallery/hexagon-layer
 * Title: deck.gl HexagonLayer Example
 * Data URL: https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv
 * Data Source: https://data.gov.uk
 */

/* eslint-disable */
/* @ts-ignore */
import { HexagonLayer } from '@deck.gl/aggregation-layers'
import { Map, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { deckgl, hexagonLayer } from '@/config'
import { ReactiveStates } from '@/enums'
import { IHexagonLayerReactiveProps, IHexagonLayerStaticProps } from '@/interfaces'
import { DataService, DeckglService, ModalService, StateService } from '@/services'

@Service()
export default class HexagonLayerService {
  private _reactiveProps: IHexagonLayerReactiveProps = hexagonLayer.reactiveProps
  private _reactiveStates: Record<string, string> = ReactiveStates
  private _skyLayer = <SkyLayer>deckgl.skyLayer
  private _staticProps: IHexagonLayerStaticProps = hexagonLayer.staticProps

  constructor(
    private _map: Map,
    private _hexagonLayerData: number[][],
    private _dataService: DataService,
    private _deckglService: DeckglService,
    private _modalService: ModalService,
    private _stateService: StateService
  ) {
    this._dataService = Container.get(DataService)
    this._deckglService = Container.get(DeckglService)
    this._modalService = Container.get(ModalService)
    this._stateService = Container.get(StateService)
  }

  get state(): IHexagonLayerReactiveProps {
    const { HEXAGON_LAYER_REACTIVE_PROPS } = this._reactiveStates
    return <IHexagonLayerReactiveProps>this._stateService.getReactiveState(HEXAGON_LAYER_REACTIVE_PROPS)
  }

  private set _state(props: IHexagonLayerReactiveProps) {
    const { HEXAGON_LAYER_REACTIVE_PROPS } = this._reactiveStates
    this._stateService.setReactiveState(HEXAGON_LAYER_REACTIVE_PROPS, props)
  }

  loadHexagonLayer(): void {
    this._deckglService.loadDeckgl()
    this._deckglService.loadMapbox()
    this.setMapInstance()
  }

  setHexagonLayerReactivePropsState({ prop, value }: Record<string, string>): void {
    const state = this.state
    state[prop as keyof IHexagonLayerReactiveProps] = Number(value)
    this._state = state
    this.renderHexagonLayer()
  }

  resetHexagonLayerReactivePropsState(): void {
    this._state = this._reactiveProps
    this.renderHexagonLayer()
  }

  private setMapInstance(): void {
    const { map } = this._deckglService
    this._map = map.on('load', (): void => this.onMapLoadHandler())
  }

  private onMapLoadHandler(): void {
    this.addSkyLayer()
    this.renderHexagonLayer()
    this.hideModal()
  }

  private addSkyLayer(): void {
    this._map.addLayer(this._skyLayer)
  }

  private renderHexagonLayer(): void {
    !this._hexagonLayerData?.length && this.setHexagonLayerData()
    const { deck } = this._deckglService
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

  private hideModal(): void {
    setTimeout((): void => this._modalService.hideModal(), 400)
  }
}
