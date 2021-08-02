import cloneDeep from 'lodash.clonedeep'
import { FeatureCollection } from 'geojson'
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

  setLayer(fc: FeatureCollection, layer: ILayer): void {
    this._layers.push(this.setLayerSourceData(fc, layer))
  }

  private setLayerSourceData(fc: FeatureCollection, layer: ILayer): ILayer {
    layer.source.data = fc
    return cloneDeep(layer)
  }
}
