import { Container, Service } from 'typedi'

import { ReactiveStates } from '@/enums'
import { IModal } from '@/interfaces'
import { StateService } from '@/services'

@Service()
export default class ModalService {
  private _reactiveStates: Record<string, string> = ReactiveStates

  constructor(private _stateService: StateService) {
    this._stateService = Container.get(StateService)
  }

  get state(): IModal {
    const { MODAL } = this._reactiveStates
    return <IModal>this._stateService.getReactiveState(MODAL)
  }

  private set _state(modal: IModal) {
    const { MODAL } = this._reactiveStates
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
