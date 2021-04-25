import { Service } from 'typedi'

import { Layer } from '@/interfaces'

@Service()
export default class LayerService {
  constructor(public layers: any[]) {
    this.layers = []
  }

  setLayers(layer: Layer): void {
    this.layers.push(layer)
  }
}
