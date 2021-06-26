import { Container, Service } from 'typedi'

import { LayerElements, States } from '@/enums'
import { ILayer, ILayers } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class LayerService {
  private _layers: ILayer[] = []
  private _layerElements: Record<string, string> = LayerElements
  private _states: Record<string, string> = States

  constructor(private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  get state(): ILayers {
    const { LAYERS } = this._states
    return <ILayers>this._storeService.getState(LAYERS)
  }

  get layers(): ILayer[] {
    return this._layers
  }

  private set _state(layers: ILayers) {
    const { LAYERS } = this._states
    this._storeService.setState(LAYERS, layers)
  }

  setLayer(layer: ILayer): void {
    this._layers.push(layer)
  }

  setLayerState(id: string): void {
    const { BIOSPHERE, BIOSPHERE_BORDER } = this._layerElements
    const layers: ILayers = this.state
    layers[id as keyof ILayers].isActive = !layers[id as keyof ILayers].isActive
    if (id === BIOSPHERE) {
      layers[BIOSPHERE_BORDER as keyof ILayers].isActive =
        !layers[BIOSPHERE_BORDER as keyof ILayers].isActive
    }
    this._state = layers
  }
}
