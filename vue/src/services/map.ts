import cloneDeep from 'lodash/cloneDeep'
import { FillLayer, LineLayer, Map, MapLayerMouseEvent, Marker, Popup, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'
import { Store } from 'vuex'

import { mapbox_settings } from '@/config'
import { LayerService, MapboxService } from '@/services'
import store from '@/store'

@Service()
export default class MapService {
  constructor(
    public map: Map,
    private _layerService: LayerService,
    private _mapboxService: MapboxService,
    private _skyLayer: any,
    private _store: Store<any>
  ) {
    this._layerService = Container.get(LayerService)
    this._mapboxService = Container.get(MapboxService)
    this._skyLayer = mapbox_settings.sky
    this._store = store
  }

  loadMap(): void {
    this._mapboxService.loadMapbox()
    this.map = this._mapboxService.map
    this.map.on('load', (): void => {
      this.addLayers()
    })
  }

  addToMap(el: Marker | Popup): void {
    el.addTo(this.map)
  }

  addLayer(layer: FillLayer | LineLayer): void {
    const { id } = layer
    this.map.addLayer(layer)
    this.setLayerVisibility(id)
  }

  setLayerVisibility(id: string): void {
    const { layers } = cloneDeep(this._store.getters['layers/getLayersVisibility'])
    layers[id].visible
      ? this.map.setLayoutProperty(id, 'visibility', 'visible')
      : this.map.setLayoutProperty(id, 'visibility', 'none')
  }

  setMapStyle(): void {
    const { mapStyles } = cloneDeep(this._store.getters['mapStyles/getMapStyles'])
    const mapStyle: any[] = Object.entries(mapStyles).filter(
      (mapStyle: any[]) => mapStyle[1].visible
    )
    const { url } = mapStyle[0][1]

    this.map.setStyle(url)
    this._mapboxService.mapStyle = url
    /* add layers after 1 sec delay to set basemap style */
    setTimeout((): void => this.addLayers(), 1000)
  }

  flyTo(trail: any): void {
    this.map.flyTo({
      center: trail.center,
      zoom: trail.zoom
    })
  }

  private addLayers(): void {
    this.map.addLayer(this._skyLayer as SkyLayer)
    for (const layer of this._layerService.layers) {
      this.addLayer(layer)
    }
  }
}
