import { Container, Service } from 'typedi'

import { StoreStates } from '@/enums'
import { IModal } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class ModalService {
  private _MODAL: string = StoreStates.MODAL
  private _modalState: IModal | Record<string, any> = {}

  constructor(private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  getModalState = (): IModal => {
    return this._storeService.getState(this._MODAL)
  }
  hideModal = (timeout: number): void => {
    this._modalState = this.getModalState()
    this._modalState.active &&
      setTimeout((): void => this._storeService.setState(this._MODAL), timeout)
  }
  showModal = (): void => {
    this._modalState = this.getModalState()
    !this._modalState.active && this._storeService.setState(this._MODAL)
  }
}
