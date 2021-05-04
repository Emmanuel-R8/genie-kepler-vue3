import cloneDeep from 'lodash/cloneDeep'
import { FillLayer, LineLayer, Map, MapLayerMouseEvent, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'
import { Store } from 'vuex'

import { mapSettings } from '@/config'
import { MapStyle } from '@/interfaces'
import { MapboxService, PopupService, StyleLayerService } from '@/services'
import store from '@/store'

@Service()
export default class MapService {
  constructor(
    private _map: Map,
    private _mapboxService: MapboxService,
    private _popupService: PopupService,
    private _styleLayerService: StyleLayerService,
    private _skyLayer: SkyLayer,
    private _store: Store<any>
  ) {
    this._mapboxService = Container.get(MapboxService)
    this._popupService = Container.get(PopupService)
    this._styleLayerService = Container.get(StyleLayerService)
    this._skyLayer = mapSettings.skyLayer as SkyLayer
    this._store = store
  }

  loadMap(): void {
    this._mapboxService.loadMapbox()
    this._map = this._mapboxService.map
    this._map.on('load', (): void => {
      this.addLayers()
    })
  }

  flyTo(trail: any): void {
    this._map.flyTo({
      center: trail.center,
      zoom: trail.zoom
    })
  }

  setMapStyle(): void {
    const mapStyles: MapStyle = cloneDeep(this._store.getters['mapStyles/getMapStyles'])
    const mapStyle: any[] = Object.entries(mapStyles).filter(
      (mapStyle: any[]) => mapStyle[1].visible
    )
    const { url } = mapStyle[0][1]

    this._map.setStyle(url)
    this._mapboxService.mapStyle = url
    this._mapboxService.setMapboxSettings()
    /* add layers after 1 sec delay to set basemap style */
    setTimeout((): void => this.addLayers(), 1000)
  }

  setStyleLayerVisibility(id: string): void {
    const styleLayers: any = cloneDeep(this._store.getters['styleLayers/getStyleLayersVisibility'])
    styleLayers[id].visible
      ? this._map.setLayoutProperty(id, 'visibility', 'visible')
      : this._map.setLayoutProperty(id, 'visibility', 'none')

    if (styleLayers[id].visible && id === 'biosphere') {
      this.setStyleLayerEventHandlers(id)
    }
  }

  private setStyleLayerEventHandlers(id: string): void {
    this._map
      .on('click', id, (evt: MapLayerMouseEvent): void => {
        this._popupService.addLayerPopup(evt)
      })
      .on('mouseenter', id, (): void => {
        this._map.getCanvas().style.cursor = 'pointer'
      })
      .on('mouseleave', id, (): void => {
        this._map.getCanvas().style.cursor = ''
        this._popupService.removePopup()
      })
  }

  private addLayers(): void {
    this._map.addLayer(this._skyLayer)
    for (const layer of this._styleLayerService.styleLayers) {
      this.addStyleLayer(layer)
    }
  }

  private addStyleLayer(layer: FillLayer | LineLayer): void {
    const { id } = layer
    this._map.addLayer(layer)
    this.setStyleLayerVisibility(id)
  }
}
