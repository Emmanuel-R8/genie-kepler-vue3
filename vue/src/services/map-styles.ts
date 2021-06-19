import { Container, Service } from 'typedi'

import { States } from '@/enums'
import { IMapStyle } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class MapStylesService {
  private _states: Record<string, string> = States

  constructor(private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  get state(): IMapStyle[] {
    const { MAP_STYLES } = this._states
    return <IMapStyle[]>this._storeService.getState(MAP_STYLES)
  }
}
