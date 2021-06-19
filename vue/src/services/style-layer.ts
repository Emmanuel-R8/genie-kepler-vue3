import { Container, Service } from 'typedi'

import { States } from '@/enums'
import { IStyleLayer, IStyleLayers } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class StyleLayerService {
  private _states: Record<string, string> = States
  private _styleLayers: IStyleLayer[] = []

  constructor(private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  get state(): IStyleLayers {
    const { STYLE_LAYERS } = this._states
    return <IStyleLayers>this._storeService.getState(STYLE_LAYERS)
  }

  get styleLayers(): IStyleLayer[] {
    return this._styleLayers
  }

  setStyleLayers(styleLayer: IStyleLayer): void {
    this._styleLayers.push(styleLayer)
  }
}
