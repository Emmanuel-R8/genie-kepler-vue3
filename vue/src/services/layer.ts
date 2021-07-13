import { Service } from 'typedi'

import { ILayer } from '@/interfaces'

@Service()
export default class LayerService {
  constructor(private _layers: ILayer[]) {
    this._layers = []
  }

  get layers(): ILayer[] {
    return this._layers
  }

  setLayer(layer: ILayer): void {
    this._layers.push(layer)
  }
}
