import { Container, Service } from 'typedi'

import { States } from '@/enums'
import { IModal } from './interfaces'
import { State_Service } from '@/services'

@Service()
export class Modal_Service {
    private _states: Record<string, string> = States

    constructor(private _stateService: State_Service) {
        this._stateService = Container.get(State_Service)
    }

    get state(): IModal {
        const { MODAL } = this._states
        return <IModal>this._stateService.getReactiveState(MODAL)
    }

    private set _state(modal: IModal) {
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
