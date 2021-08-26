import { Container, Service } from 'typedi'

//
// Global state
//
import { States } from '../../Global_State'

//
// Imports common to all components
//
import { Router_Common_Service } from '../../common_services/Router/services'
import { State_Common_Service } from '../../common_services/State/services'

//
// Component-specific
//
import { LayerVisibility_Service } from '../LayerElement/services'
import { Map_Service, MapStyle_Service } from '../Mapbox/services'
import { Marker_Service } from '../Marker/services'
import { ITemplate_ReactiveProps } from './interfaces'

@Service()
export class Template_Service {
    private _template_var = undefined

    constructor(
        // Example of services to be injected
        private _layerVisibilityService: LayerVisibility_Service,
        private _mapService: Map_Service,
        private _mapStyleService: MapStyle_Service,
        private _markerService: Marker_Service,
        private _routerService: Router_Common_Service,
        private _stateService: State_Common_Service
    ) {
        this._layerVisibilityService = Container.get(LayerVisibility_Service)
        this._mapService = Container.get(Map_Service)
        this._mapStyleService = Container.get(MapStyle_Service)
        this._markerService = Container.get(Marker_Service)
        this._routerService = Container.get(Router_Common_Service)
        this._stateService = Container.get(State_Common_Service)
    }

    get state(): ITemplate_ReactiveProps {
        const { TEMPLATE } = this._stateService
        return <ITemplate_ReactiveProps>this._stateService.getReactiveState(TEMPLATE)
    }

    // private set _state(modal: IModal) {
    //     const { MODAL } = this._states
    //     this._stateService.setReactiveState(MODAL, modal)
    // }

    // hideModal(): void {
    //     this.state.isActive && this.setModalState()
    // }

    // showModal(): void {
    //     !this.state.isActive && this.setModalState()
    // }

    // private setModalState(): void {
    //     const state = this.state
    //     state.isActive = !state.isActive
    //     this._state = state
    // }
}
