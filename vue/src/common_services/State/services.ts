//
// Global state (variables) describing the app
//

import { Container, Service } from 'typedi'
import { reactive } from 'vue'
import cloneDeep from 'lodash.clonedeep'

//
// Global state
//
import { IAbstractReactiveState, IAbstractStaticState } from './interfaces'
import { States } from '../../Global_State'

//
// Imports common to all components
//
import { Log_Common_Service } from '../../common_services/Log/services'

//
// Imports of individual components
//
import { deckgl_Config } from '../../components/Deckgl/config'
import { IDeckgl_ReactiveProps, IDeckgl_StaticProps } from '../../components/Deckgl/interfaces'

import { hexagonLayer_Config } from '../../components/HexagonLayer/config'
import { IHexagonLayer_ReactiveProps, IHexagonLayer_StaticProps } from '../../components/HexagonLayer/interfaces'

import { layerVisibility_Config, perLayer_Config } from '../../components/LayerElement/config'
import {
    ISingleLayer_ReactiveProps, ISingleLayer_StaticProps,
    ILayerVisibility_ReactiveProps, ILayerVisibility_StaticProps,
} from '../../components/LayerElement/interfaces'

import { layerElements_Config } from '../../components/LayerElements/config'
import { } from '../../components/LayerElements/interfaces'

import { mapbox_Config, mapStyles_Config } from '../../components/Mapbox/config'
import {
    IMapbox_ReactiveProps,
    IMapbox_StaticProps,
    IMapStyle_ReactiveProps,
    IMapStyle_StaticProps
} from '../../components/Mapbox/interfaces'

import { modal_Config } from '../../components/Modal/config'
import { IModal_ReactiveProps, IModal_StaticProps } from '../../components/Modal/interfaces'

import { localStaticImage_Config } from '../../components/LocalStaticImage/config'
import {
    ILocalStaticImage_ReactiveProps,
    ILocalStaticImage_StaticProps
} from '../../components/LocalStaticImage/interfaces'

// TEMPLATE
// import { template_Config } from '../components/Template/config'
// import { ILocalStaticImage_ReactiveProps, ILocalStaticImage_StaticProps } from '../components/Template/interfaces'

@Service()
export class State_Common_Service {
    private _deckglView_ReactiveState: IDeckgl_ReactiveProps = deckgl_Config.reactiveProps
    private _deckglView_StaticState: IDeckgl_StaticProps = deckgl_Config.staticProps

    private _hexagonLayer_ReactiveState: IHexagonLayer_ReactiveProps = hexagonLayer_Config.reactiveProps
    private _hexagonLayer_StaticState: IHexagonLayer_StaticProps = hexagonLayer_Config.staticProps

    private _perLayer_ReactiveState: ISingleLayer_ReactiveProps[] = perLayer_Config.reactiveProps
    private _perLayer_StaticState: ISingleLayer_StaticProps[] = perLayer_Config.staticProps

    private _layerVisibility_ReactiveState: ILayerVisibility_ReactiveProps = layerVisibility_Config.reactiveProps
    private _layerVisibility_StaticState: ILayerVisibility_StaticProps = layerVisibility_Config.staticProps

    private _mapStyles_ReactiveState: IMapStyle_ReactiveProps[] = mapStyles_Config.reactiveProps
    private _mapStyles_StaticState: IMapStyle_StaticProps[] = mapStyles_Config.staticProps

    private _mapboxView_ReactiveState: IMapbox_ReactiveProps = mapbox_Config.reactiveProps
    private _mapboxView_StaticState: IMapbox_StaticProps = mapbox_Config.staticProps

    private _modal_ReactiveState: IModal_ReactiveProps = modal_Config.reactiveProps
    private _modal_StaticState: IModal_StaticProps = modal_Config.staticProps

    // New additions
    private _localStaticImage_ReactiveState: ILocalStaticImage_ReactiveProps = localStaticImage_Config.reactiveProps
    private _localStaticImage_StaticState: ILocalStaticImage_StaticProps = localStaticImage_Config.staticProps

    // TEMPLATE
    // private _template_ReactiveState: ITemplate_ReactiveProps = template_Config.reactiveProps
    // private _template_StaticState: ITemplate_StaticProps = template_Config.staticProps

    private _states_record: Record<string, string> = States

    constructor(
        private _logService: Log_Common_Service,
        private _reactiveState: Record<string, IAbstractReactiveState>,
        private _staticState: Record<string, IAbstractStaticState>
    ) {
        this._logService = Container.get(Log_Common_Service)
        this.createReactiveState()
        this.createStaticState()
    }

    getReactiveState(state: string): IAbstractReactiveState {
        return cloneDeep(this._reactiveState[state])
    }

    setReactiveState(state: string, payload: IAbstractReactiveState): void {
        this.logReactiveState({ state, status: 'OLD' })
        this._reactiveState[state] = cloneDeep(payload)
        this.logReactiveState({ state, status: 'NEW' })
    }

    getStaticState(state: string): IAbstractStaticState {
        return cloneDeep(this._staticState[state])
    }

    setStaticState(state: string, payload: IAbstractStaticState): void {
        this.logStaticState({ state, status: 'OLD' })
        this._staticState[state] = cloneDeep(payload)
        this.logStaticState({ state, status: 'NEW' })
    }

    private createReactiveState(): void {
        const {
            DECKGL_VIEW_REACTIVESTATE,
            HEXAGON_LAYER_REACTIVESTATE,
            LAYER_ELEMENTS_REACTIVESTATE,
            LAYER_VISIBILITY_REACTIVESTATE,
            MAP_STYLES_REACTIVESTATE,
            MAPBOX_VIEW_REACTIVESTATE,
            MODAL_REACTIVESTATE,

            // New additions
            LOCAL_STATIC_IMAGE_REACTIVESTATE,

            // TEMPLATE
            // TEMPLATE_REACTIVESTATE,

            DECKGL_VIEW_STATICSTATE,
            HEXAGON_LAYER_STATICSTATE,
            LAYER_ELEMENTS_STATICSTATE,
            LAYER_VISIBILITY_STATICSTATE,
            MAP_STYLES_STATICSTATE,
            MAPBOX_VIEW_STATICSTATE,
            MODAL_STATICSTATE,

            // New additions
            LOCAL_STATIC_IMAGE_STATICSTATE

            // TEMPLATE
            // TEMPLATE_STATICSTATE,
        } = this._states_record

        this._reactiveState = reactive({
            [DECKGL_VIEW_REACTIVESTATE]: this._deckglView_ReactiveState,
            [HEXAGON_LAYER_REACTIVESTATE]: this._hexagonLayer_ReactiveState,
            [LAYER_ELEMENTS_REACTIVESTATE]: this._perLayer_ReactiveState,
            [LAYER_VISIBILITY_REACTIVESTATE]: this._layerVisibility_ReactiveState,
            [MAP_STYLES_REACTIVESTATE]: this._mapStyles_ReactiveState,
            [MAPBOX_VIEW_REACTIVESTATE]: this._mapboxView_ReactiveState,
            [MODAL_REACTIVESTATE]: this._modal_ReactiveState,

            // New additions
            [LOCAL_STATIC_IMAGE_REACTIVESTATE]: this._localStaticImage_ReactiveState

            // TEMPLATE
            // [TEMPLATE_REACTIVESTATE]: this._template_ReactiveState,
        })
    }

    private createStaticState(): void {
        const {
            DECKGL_VIEW_REACTIVESTATE,
            HEXAGON_LAYER_REACTIVESTATE,
            LAYER_ELEMENTS_REACTIVESTATE,
            LAYER_VISIBILITY_REACTIVESTATE,
            MAP_STYLES_REACTIVESTATE,
            MAPBOX_VIEW_REACTIVESTATE,
            MODAL_REACTIVESTATE,

            // New additions
            LOCAL_STATIC_IMAGE_REACTIVESTATE,

            // TEMPLATE
            // TEMPLATE_REACTIVESTATE,

            DECKGL_VIEW_STATICSTATE,
            HEXAGON_LAYER_STATICSTATE,
            LAYER_ELEMENTS_STATICSTATE,
            LAYER_VISIBILITY_STATICSTATE,
            MAP_STYLES_STATICSTATE,
            MAPBOX_VIEW_STATICSTATE,
            MODAL_STATICSTATE,

            // New additions
            LOCAL_STATIC_IMAGE_STATICSTATE

            // TEMPLATE
            // TEMPLATE_STATICSTATE,
        } = this._states_record

        this._staticState = {
            [DECKGL_VIEW_STATICSTATE]: this._deckglView_StaticState,
            [HEXAGON_LAYER_STATICSTATE]: this._hexagonLayer_StaticState,
            [LAYER_ELEMENTS_STATICSTATE]: this._perLayer_StaticState,
            [LAYER_VISIBILITY_STATICSTATE]: this._layerVisibility_StaticState,
            [MAP_STYLES_STATICSTATE]: this._mapStyles_StaticState,
            [MAPBOX_VIEW_STATICSTATE]: this._mapboxView_StaticState,
            [MODAL_STATICSTATE]: this._modal_StaticState,

            // New additions
            [LOCAL_STATIC_IMAGE_STATICSTATE]: this._localStaticImage_StaticState

            // TEMPLATE
            // [TEMPLATE_STATICSTATE]: this._template_StaticState,
        }
    }

    private logReactiveState({ state, status }: Record<string, string>): void {
        this._logService.consoleLog(`${state} ${status} state:`, this.getReactiveState(state))
    }

    private logStaticState({ state, status }: Record<string, string>): void {
        this._logService.consoleLog(`${state} ${status} state:`, this.getStaticState(state))
    }
}
