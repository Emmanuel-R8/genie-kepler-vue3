import { Container, Service } from 'typedi'

import { IModal } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class ModalService {
  private _modalState: IModal | Record<string, any> = {}

  constructor(private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  hideModal = (timeout?: number): void => {
    this._modalState = this.getModalState()
    this._modalState.active && this.setModalState(timeout)
  }
  showModal = (timeout?: number): void => {
    this._modalState = this.getModalState()
    !this._modalState.active && this.setModalState(timeout)
  }

  getModalState = (): IModal => this._storeService.getModalState()

  private setModalState = (timeout?: number): number | void =>
    timeout
      ? setTimeout((): void => this._storeService.setModalState(), timeout)
      : this._storeService.setModalState()
}
