import { Container, Service } from 'typedi'

//
// Global state
//
import { States } from '../../Global_State'

//
// Imports common to all components
//
import { State_Common_Service } from '../../common_services/State/services'

//
// Imports common to all components
//
import { IModal_ReactiveProps } from './interfaces'
@Service()
export class Modal_Service {
    private _states: Record<string, string> = States

    constructor(private _stateService: State_Common_Service) {
        this._stateService = Container.get(State_Common_Service)
    }

    get state(): IModal_ReactiveProps {
        const { MODAL } = this._states
        return <IModal_ReactiveProps>this._stateService.getReactiveState(MODAL)
    }

    private set _state(modal: IModal_ReactiveProps) {
        const { MODAL } = this._states
        this._stateService.setReactiveState(MODAL, modal)
    }

    hideModal(): void {
        this.state.isActive && this.setModalState()
    }

    showModal(): void {
        !this.state.isActive && this.setModalState()
    }

    private setModalState(): void {
        const state = this.state
        state.isActive = !state.isActive
        this._state = state
    }
}
