import { Service } from 'typedi'

import { IModal, IStore } from '@/interfaces'
import { store } from '@/store'

@Service()
export default class StoreService {
  private _store: IStore = store

  getModalState = (): IModal => this._store.getters.getModalState()
  setModalState = (): void => this._store.setters.setModalState()
}
