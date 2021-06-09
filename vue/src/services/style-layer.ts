import { Service } from 'typedi'

import { IStyleLayer } from '@/interfaces'

@Service()
export default class StyleLayerService {
  styleLayers: IStyleLayer[] = []

  setStyleLayers(styleLayer: IStyleLayer): void {
    this.styleLayers.push(styleLayer)
  }
}
