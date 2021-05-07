import { Service } from 'typedi'

import { IStyleLayer } from '@/interfaces'

@Service()
export default class StyleLayerService {
  constructor(public styleLayers: any[]) {
    this.styleLayers = []
  }

  setStyleLayers(layer: IStyleLayer): void {
    this.styleLayers.push(layer)
  }
}
