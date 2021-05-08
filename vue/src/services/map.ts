import cloneDeep from 'lodash/cloneDeep'
import { FillLayer, LineLayer, Map, MapLayerMouseEvent, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapSettings } from '@/config'
import { IMapStyle, IStore, IStyleLayer } from '@/interfaces'
import { MapboxService, PopupService, StyleLayerService } from '@/services'
import { store } from '@/store'

@Service()
export default class MapService {
  constructor(
    public map: Map,
    private _mapboxService: MapboxService,
    private _popupService: PopupService,
    private _styleLayerService: StyleLayerService,
    private _skyLayer: SkyLayer,
    private _store: IStore
  ) {
    this._mapboxService = Container.get(MapboxService)
    this._popupService = Container.get(PopupService)
    this._styleLayerService = Container.get(StyleLayerService)
    this._skyLayer = mapSettings.skyLayer as SkyLayer
    this._store = store
  }

  loadMap(): void {
    this._mapboxService.loadMapbox()
    this.map = this._mapboxService.map
    this.map.on('load', (): void => {
      this.addLayers()
    })
  }

  addLayers(): void {
    this.map.addLayer(this._skyLayer)
    for (const layer of this._styleLayerService.styleLayers) {
      this.addStyleLayer(layer)
    }
  }

  flyTo(trail: any): void {
    const { center, zoom } = trail
    this.map.flyTo({
      center,
      zoom
    })
  }

  setMapStyle(): void {
    const mapStyles: IMapStyle = cloneDeep(this._store.getters.getMapStylesState())
    const mapStyle: [string, any][] = Object.entries(mapStyles).filter(
      (mapStyle: [string, any]) => mapStyle[1].visible
    )
    const { url } = mapStyle[0][1]
    this.map.setStyle(url)
    this._mapboxService.mapStyle = url
    this._mapboxService.setMapboxSettings()
    /* add layers after 1 sec delay to set basemap style */
    setTimeout((): void => this.addLayers(), 1000)
  }

  setStyleLayerVisibility(id: string): void {
    const styleLayers: IStyleLayer = cloneDeep(this._store.getters.getStyleLayersVisibilityState())
    styleLayers[id as keyof IStyleLayer].visible
      ? this.map.setLayoutProperty(id, 'visibility', 'visible')
      : this.map.setLayoutProperty(id, 'visibility', 'none')
    if (styleLayers[id as keyof IStyleLayer].visible && id === 'biosphere') {
      this.setStyleLayerEventHandlers(id)
    }
  }

  private setStyleLayerEventHandlers(id: string): void {
    this.map
      .on('click', id, (evt: MapLayerMouseEvent): void => {
        this._popupService.addLayerPopup(evt)
      })
      .on('mouseenter', id, (): void => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      .on('mouseleave', id, (): void => {
        this.map.getCanvas().style.cursor = ''
        this._popupService.removePopup()
      })
  }

  private addStyleLayer(layer: FillLayer | LineLayer): void {
    const { id } = layer
    this.map.addLayer(layer)
    this.setStyleLayerVisibility(id)
  }
}
