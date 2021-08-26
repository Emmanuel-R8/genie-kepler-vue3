/* eslint-disable */
/* @ts-ignore */
import { Container, Service } from 'typedi'

/* eslint-disable-next-line */
import { Deck, ViewState } from '@deck.gl/core'
import { LngLatLike, Map, MapboxOptions, SkyLayer } from 'mapbox-gl'


//
// Global state
//
import { States } from '../../Global_State'
import { State_Common_Service } from '../../common_services/State/services'


//
// Imports of individual components
//
import { deckgl_Config } from './config'
import { Modal_Service } from '../Modal/services'

import { IDeckgl_Settings, IDeckgl_StaticProps } from './interfaces'


@Service()
export class Deckgl_Service {
    // Graphical options re: the DeckGL rendering
    private _reactiveProps: IDeckgl_Settings = deckgl_Config.reactiveProps
    private _skyLayer = <SkyLayer>deckgl_Config.skyLayer
    private _states: Record<string, string> = States

    constructor(
        private _deck: Deck,
        private _map: Map,
        private _modalService: Modal_Service,
        private _stateService: State_Common_Service
    ) {
        this._modalService = Container.get(Modal_Service)
        this._stateService = Container.get(State_Common_Service)
    }

    get deck(): Deck {
        return this._deck
    }

    get map(): Map {
        return this._map
    }

    private get _state(): IDeckgl_StaticProps {
        const { DECKGL_VIEW_STATICSTATE } = this._states
        return <IDeckgl_StaticProps>this._stateService.getStaticState(DECKGL_VIEW_STATICSTATE)
    }

    private set _state(settings: IDeckgl_StaticProps) {
        const { DECKGL_VIEW_STATICSTATE } = this._states
        this._stateService.setStaticState(DECKGL_VIEW_STATICSTATE, settings)
    }

    loadDeckgl(): void {
        const { canvas, controller, id, maxPitch, maxZoom, minZoom } = this._reactiveProps
        this._deck = new Deck({
            canvas,
            controller,
            id,
            initialViewState: {
                maxPitch,
                maxZoom,
                minZoom,
                ...this._state
            },

            onViewStateChange: ({
                viewState: { bearing, latitude, longitude, pitch, zoom }
            }: ViewState): void => {
                const center: LngLatLike = { lng: longitude, lat: latitude }
                this._state = { bearing, center, latitude, longitude, pitch, zoom }
                this._map.jumpTo(this._state)
            },

            getTooltip: ({ object }: Record<string, any>): string | null => {
                if (!object) return null
                const { points }: Record<string, []> = object
                return `${points.length} Accidents`
            }
        })
    }

    loadMapbox(): void {
        const { container, interactive, style } = this._reactiveProps
        const options: MapboxOptions = { container, interactive, style, ...this._state }
        this._map = new Map(options).on('load', (): void => this.onMapLoadHandler())
    }

    removeDeckInstance(): void {
        this._deck.finalize()
    }

    removeMapInstance(): void {
        this._map.remove()
    }

    private onMapLoadHandler(): void {
        this.addSkyLayer()
        this.hideModal()
    }

    private addSkyLayer(): void {
        this._map.addLayer(this._skyLayer)
    }

    private hideModal(): void {
        this._modalService.hideModal()
    }
}
