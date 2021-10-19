import { FeatureCollection } from 'geojson'
import cloneDeep from 'lodash.clonedeep'
import { Service } from 'typedi'

import { ILayer } from '@/interfaces'

@Service()
export default class GeoJsonLayerService {
  private _layers: ILayer[] = []

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
