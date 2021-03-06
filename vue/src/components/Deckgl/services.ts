/* eslint-disable */
/* @ts-ignore */
import { Container, Service } from 'typedi'

import { Deck, ViewState } from '@deck.gl/core'
import { LngLatLike, Map, MapboxOptions, SkyLayer } from 'mapbox-gl'

import { deckgl_Config } from './config'
import { States } from '@/enums'
import { IDeckgl_Settings, IDeckglView_Settings } from './interfaces'
import { State_Service } from '@/services'

import { Modal_Service } from '../Modal/services'


@Service()
export class Deckgl_Service {
    // Graphical options re: the DeckGL rendering
    private _options: IDeckgl_Settings = deckgl_Config.options
    private _skyLayer = <SkyLayer>deckgl_Config.skyLayer
    private _states: Record<string, string> = States

    constructor(
        private _deck: Deck,
        private _map: Map,
        private _modalService: Modal_Service,
        private _stateService: State_Service
    ) {
        this._modalService = Container.get(Modal_Service)
        this._stateService = Container.get(State_Service)
    }

    get deck(): Deck {
        return this._deck
    }

    get map(): Map {
        return this._map
    }

    private get _state(): IDeckglView_Settings {
        const { DECKGL_VIEW_SETTINGS } = this._states
        return <IDeckglView_Settings>this._stateService.getStaticState(DECKGL_VIEW_SETTINGS)
    }

    private set _state(settings: IDeckglView_Settings) {
        const { DECKGL_VIEW_SETTINGS } = this._states
        this._stateService.setStaticState(DECKGL_VIEW_SETTINGS, settings)
    }

    loadDeckgl(): void {
        const { canvas, controller, id, maxPitch, maxZoom, minZoom } = this._options
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
        const { container, interactive, style } = this._options
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
