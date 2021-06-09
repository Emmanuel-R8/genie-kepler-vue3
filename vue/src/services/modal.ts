import { Container, Service } from 'typedi'

import { States } from '@/enums'
import { IModal } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class ModalService {
  private _MODAL: string = States.MODAL

  constructor(private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  get state(): IModal {
    return this._storeService.getState(this._MODAL)
  }

  hideModal(timeout: number): void {
    this.state.isActive && setTimeout((): void => this._storeService.setState(this._MODAL), timeout)
  }
  showModal(): void {
    !this.state.isActive && this._storeService.setState(this._MODAL)
  }
}
