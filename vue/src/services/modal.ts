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

  hideModal(timeout: number): void {
    const { MODAL } = this._states
    this.state.isActive && setTimeout((): void => this._storeService.setState(MODAL), timeout)
  }

  showModal(): void {
    const { MODAL } = this._states
    !this.state.isActive && this._storeService.setState(MODAL)
  }
}
