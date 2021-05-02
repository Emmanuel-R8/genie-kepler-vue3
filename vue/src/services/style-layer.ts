import { Service } from 'typedi'

import { StyleLayer } from '@/interfaces'

@Service()
export default class StyleLayerService {
  constructor(public styleLayers: any[]) {
    this.styleLayers = []
  }

  setStyleLayers(layer: StyleLayer): void {
    this.styleLayers.push(layer)
  }
}
