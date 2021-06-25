import { Container, Service } from 'typedi'

import { States } from '@/enums'
import { IModal } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class ModalService {
  private _states: Record<string, string> = States

  constructor(private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  get state(): IModal {
    const { MODAL } = this._states
    return <IModal>this._storeService.getState(MODAL)
  }

  private set _state(modal: IModal) {
    const { MODAL } = this._states
    this._storeService.setState(MODAL, modal)
  }

  hideModal(timeout: number): void {
    const modal = this.state
    modal.isActive && setTimeout((): void => this.setModalState(modal), timeout)
  }

  showModal(): void {
    const modal = this.state
    !modal.isActive && this.setModalState(modal)
  }

  private setModalState(modal: IModal): void {
    modal.isActive = !modal.isActive
    this._state = modal
  }
}
