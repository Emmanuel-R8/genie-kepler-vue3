/* eslint-disable */
/* @ts-ignore */
import { Container, Service } from 'typedi'


//
// Imports common to all components
//
import { Axios_Common_Service } from '../../common_services/Axios/services'
import { Data_Common_Service } from '../../common_services/Data/services'
import { EventListener_Common_Service } from '../../common_services/EventListener/services'
import { Http_Common_Service } from '../../common_services/Http/services'
import { Log_Common_Service } from '../../common_services/Log/services'
import { Popup_Common_Service } from '../../common_services/Popup/services'
import { Router_Common_Service } from '../../common_services/Router/services'
import { State_Common_Service } from '../../common_services/State/services'

import {States} from '../../Global_State'

// Import interfaces and config defined for that service
import { localStaticImage_Config } from './config'
import { ILocalStaticImage_ReactiveProps, ILocalStaticImage_StaticProps} from './interfaces'


@Service()
export default class LocalStaticImage_Service {

    private _reactiveProps: ILocalStaticImage_ReactiveProps = localStaticImage_Config.reactiveProps
    private _staticProps: ILocalStaticImage_StaticProps = localStaticImage_Config.staticProps
    private _states: Record<string, string> = States

    constructor(
        // -- Class variables
        // private _deck: Deck,
        // private _map: Map,

        // -- Class variables as injected dependencies
        private _globalState: State_Common_Service
    ) {
        // Injection
        this._globalState = Container.get(State_Common_Service)
    }

    // -- Class variables getters/setters
    // get deck(): Deck {
    //     return this._deck
    // }

    // get map(): Map {
    //     return this._map
    // }


    // -- Initialise from settings
    private get _state(): ILocalStaticImage_ReactiveProps {
        const { LOCAL_STATIC_IMAGE_REACTIVESTATE } = this._states
        return <ILocalStaticImage_ReactiveProps>this._globalState.getReactiveState(LOCAL_STATIC_IMAGE_REACTIVESTATE)
    }

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
}
