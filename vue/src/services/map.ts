import { FillLayer, LineLayer, Map, MapLayerMouseEvent, Marker, Popup, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'
import { Store } from 'vuex'

import { map_settings } from '@/config'
import { MapboxService, StyleLayerService } from '@/services'
import store from '@/store'

@Service()
export default class MapService {
  constructor(
    public map: Map,
    private _mapboxService: MapboxService,
    private _styleLayerService: StyleLayerService,
    private _skyLayer: SkyLayer,
    private _store: Store<any>
  ) {
    this._mapboxService = Container.get(MapboxService)
    this._styleLayerService = Container.get(StyleLayerService)
    this._skyLayer = map_settings.sky as SkyLayer
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

  flyTo(trail: any): void {
    this.map.flyTo({
      center: trail.center,
      zoom: trail.zoom
    })
  }

  setMapStyle(): void {
    const { mapStyles } = this._store.getters['mapStyles/getMapStyles']
    const mapStyle: any[] = Object.entries(mapStyles).filter(
      (mapStyle: any[]) => mapStyle[1].visible
    )
    const { url } = mapStyle[0][1]

    this.map.setStyle(url)
    this._mapboxService.mapStyle = url
    /* add layers after 1 sec delay to set basemap style */
    setTimeout((): void => this.addLayers(), 1000)
  }

  setStyleLayerVisibility(id: string): void {
    const { styleLayers } = this._store.getters['styleLayers/getStyleLayersVisibility']
    styleLayers[id].visible
      ? this.map.setLayoutProperty(id, 'visibility', 'visible')
      : this.map.setLayoutProperty(id, 'visibility', 'none')
  }

  private addLayers(): void {
    this.map.addLayer(this._skyLayer)
    for (const layer of this._styleLayerService.styleLayers) {
      this.addStyleLayer(layer)
    }
  }

  private addStyleLayer(layer: FillLayer | LineLayer): void {
    const { id } = layer
    this.map.addLayer(layer)
    this.setStyleLayerVisibility(id)
  }
}
