/* eslint-disable */
/* @ts-ignore */
import { Container, Service } from 'typedi'

// Import interfaces and config defined for that service
import { localStaticImage_Config } from './config'
import {
    ILocalStaticImage_Settings,
    ILocalStaticImage_StaticProps,
    ILocalStaticImage_ReactiveProps
} from './interfaces'

// Import substructures part of this structure as services to be injected
import { Modal_Service, State_Service } from '@/services'

@Service()
export default class LocalStaticImage_Service {
    // Graphical options re: the DeckGL rendering
    private _options: ILocalStaticImage_Settings = localStaticImage_Config.settings
    // TO BE KEPT AS EXAMPLE
    // private _skyLayer = <SkyLayer>deckgl_Config.skyLayer
    // private _states: Record<string, string> = States

    constructor(

        // -- Class variables
        // private _deck: Deck,
        // private _map: Map,

        // -- Class variables as injected dependencies
        // private _modalService: ModalService,
        // private _stateService: StateService
    ) {
        // Injection
        // this._modalService = Container.get(ModalService)
        // this._stateService = Container.get(StateService)
    }

    // -- Class variables getters/setters
    // get deck(): Deck {
    //     return this._deck
    // }

    // get map(): Map {
    //     return this._map
    // }


    // -- Initialise from settings
    // private get _state(): IDeckglViewSettings {
    //     const { DECKGL_VIEW_SETTINGS } = this._states
    //     return <IDeckglViewSettings>this._stateService.getStaticState(DECKGL_VIEW_SETTINGS)
    // }

    // private set _state(settings: IDeckglViewSettings) {
    //     const { DECKGL_VIEW_SETTINGS } = this._states
    //     this._stateService.setStaticState(DECKGL_VIEW_SETTINGS, settings)
    // }

    // loadDeckgl(): void {
    //     const { canvas, controller, id, maxPitch, maxZoom, minZoom } = this._options
    //     this._deck = new Deck({
    //         canvas,
    //         controller,
    //         id,
    //         initialViewState: {
    //             maxPitch,
    //             maxZoom,
    //             minZoom,
    //             ...this._state
    //         },

    //         onViewStateChange: ({
    //             viewState: { bearing, latitude, longitude, pitch, zoom }
    //         }: ViewState): void => {
    //             const center: LngLatLike = { lng: longitude, lat: latitude }
    //             this._state = { bearing, center, latitude, longitude, pitch, zoom }
    //             this._map.jumpTo(this._state)
    //         },

    //         getTooltip: ({ object }: Record<string, any>): string | null => {
    //             if (!object) return null
    //             const { points }: Record<string, []> = object
    //             return `${points.length} Accidents`
    //         }
    //     })
    // }

    // loadMapbox(): void {
    //     const { container, interactive, style } = this._options
    //     const options: MapboxOptions = { container, interactive, style, ...this._state }
    //     this._map = new Map(options).on('load', (): void => this.onMapLoadHandler())
    // }

    // removeDeckInstance(): void {
    //     this._deck.finalize()
    // }

    // removeMapInstance(): void {
    //     this._map.remove()
    // }

    // private onMapLoadHandler(): void {
    //     this.addSkyLayer()
    //     this.hideModal()
    // }

    // private addSkyLayer(): void {
    //     this._map.addLayer(this._skyLayer)
    // }

    // private hideModal(): void {
    //     this._modalService.hideModal()
    // }
}
