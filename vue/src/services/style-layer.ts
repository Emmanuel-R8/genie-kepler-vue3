import { Container, Service } from 'typedi'

import { LayerElements, States } from '@/enums'
import { IStyleLayer, IStyleLayers } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class StyleLayerService {
  private _layerElements: Record<string, string> = LayerElements
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

  private set _state(styleLayers: IStyleLayers) {
    const { STYLE_LAYERS } = this._states
    this._storeService.setState(STYLE_LAYERS, styleLayers)
  }

  setStyleLayers(styleLayer: IStyleLayer): void {
    this._styleLayers.push(styleLayer)
  }

  setStyleLayersState(id: string): void {
    const { BIOSPHERE, BIOSPHERE_BORDER } = this._layerElements
    const styleLayers: IStyleLayers = this.state
    styleLayers[id as keyof IStyleLayers].isActive = !styleLayers[id as keyof IStyleLayers].isActive
    if (id === BIOSPHERE) {
      styleLayers[BIOSPHERE_BORDER as keyof IStyleLayers].isActive =
        !styleLayers[BIOSPHERE_BORDER as keyof IStyleLayers].isActive
    }
    this._state = styleLayers
  }
}
