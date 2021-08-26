/* eslint-disable */
/* @ts-ignore */
import { Container, Service } from 'typedi'

/*
* URL: https://deck.gl/gallery/hexagon-layer
* Title: deck.gl HexagonLayer Example
* Data URL: https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv
* Data Source: https://data.gov.uk
*/
import { HexagonLayer } from '@deck.gl/aggregation-layers'

import { States } from '@/enums'
import { Data_Service, State_Service } from '@/common_services'

import { Deckgl_Service } from '../Deckgl/services'

import { hexagonLayer_Config } from './config'
import { IHexagonLayer_ReactiveProps, IHexagonLayer_StaticProps } from './interfaces'


@Service()
export class HexagonLayer_Service {
    private _hexagonLayerData: number[][] = []
    private _reactiveProps: IHexagonLayer_ReactiveProps = hexagonLayer_Config.reactiveProps
    private _staticProps: IHexagonLayer_StaticProps = hexagonLayer_Config.staticProps
    private _states: Record<string, string> = States

    constructor(
        private _dataService: Data_Service,
        private _deckglService: Deckgl_Service,
        private _stateService: State_Service
    ) {
        this._dataService = Container.get(Data_Service)
        this._deckglService = Container.get(Deckgl_Service)
        this._stateService = Container.get(State_Service)
    }

    get state(): IHexagonLayer_ReactiveProps {
        const { HEXAGON_LAYER_PROPS } = this._states
        return <IHexagonLayer_ReactiveProps>this._stateService.getReactiveState(HEXAGON_LAYER_PROPS)
    }

    private set _state(props: IHexagonLayer_ReactiveProps) {
        const { HEXAGON_LAYER_PROPS } = this._states
        this._stateService.setReactiveState(HEXAGON_LAYER_PROPS, props)
    }

    loadHexagonLayer(): void {
        // WHY? SECOND LOAD OVERWRITES THE FIRST???
        this._deckglService.loadDeckgl()
        this._deckglService.loadMapbox()
        const { map } = this._deckglService
        map.on('load', (): void => this.onMapLoadHandler())
    }

    setHexagonLayerPropsState({ prop, value }: Record<string, string>): void {
        const state = this.state
        state[prop as keyof IHexagonLayer_ReactiveProps] = Number(value)
        this._state = state
        this.renderHexagonLayer()
    }

    resetHexagonLayerPropsState(): void {
        this._state = this._reactiveProps
        this.renderHexagonLayer()
    }

    private onMapLoadHandler(): void {
        this.renderHexagonLayer()
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
}
