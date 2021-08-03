import { FillLayer, LineLayer, Map, MapLayerMouseEvent, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/config'
import { LayerElements } from '@/enums'
import { ILayerVisibility, ITrail } from '@/interfaces'
import {
  LayerService,
  LayerVisibilityService,
  MapboxService,
  MapStyleService,
  MarkerService,
  ModalService,
  PopupService
} from '@/services'

@Service()
export default class MapService {
  private _layerElements: Record<string, string> = LayerElements
  private _skyLayer = <SkyLayer>mapbox.skyLayer

  constructor(
    private _map: Map,
    private _layerService: LayerService,
    private _layerVisibilityService: LayerVisibilityService,
    private _mapboxService: MapboxService,
    private _mapStyleService: MapStyleService,
    private _markerService: MarkerService,
    private _modalService: ModalService,
    private _popupService: PopupService
  ) {
    this._layerService = Container.get(LayerService)
    this._layerVisibilityService = Container.get(LayerVisibilityService)
    this._mapboxService = Container.get(MapboxService)
    this._mapStyleService = Container.get(MapStyleService)
    this._markerService = Container.get(MarkerService)
    this._modalService = Container.get(ModalService)
    this._popupService = Container.get(PopupService)
  }

  loadMapLayer(): void {
    this._mapboxService.loadMapbox()
    const { map } = this._mapboxService
    this._map = map.on('load', (): void => this.onMapLoadHandler())
  }

  flyTo({ center, zoom }: ITrail): void {
    this._map.flyTo({
      center,
      zoom
    })
  }

  setMapStyle(): void {
    const { mapStyle } = this._mapStyleService
    this._map.setStyle(mapStyle)
    this.resetMapFeatures()
  }

  setLayerVisibility(id: string): void {
    const { BIOSPHERE } = this._layerElements
    const { state: layers } = this._layerVisibilityService
    layers[id as keyof ILayerVisibility].isActive
      ? this._map.setLayoutProperty(id, 'visibility', 'visible')
      : this._map.setLayoutProperty(id, 'visibility', 'none')
    id === BIOSPHERE && this.setLayerVisibilityEventListeners(id, layers)
  }

  private onMapLoadHandler(): void {
    this.addSkyLayer()
    this.addLayers()
    this.hideModal()
  }

  private addSkyLayer(): void {
    this._map.addLayer(this._skyLayer)
  }

  private addLayers(): void {
    const { layers } = this._layerService
    for (const layer of layers) {
      const { id } = layer
      this._map.addLayer(<FillLayer | LineLayer>layer)
      this.setLayerVisibility(id)
    }
  }

  private hideModal(): void {
    this._modalService.hideModal()
  }

  private setLayerVisibilityEventListeners(id: string, layers: ILayerVisibility): void {
    layers[id as keyof ILayerVisibility].isActive
      ? this._map
          .on('click', id, (evt: MapLayerMouseEvent): void => this.onMapClickHandler(evt))
          .on('mouseenter', id, (): void => this.onMapMouseEnterHandler())
          .on('mouseleave', id, (): void => this.onMapMouseLeaveHandler())
      : this._map
          .off('click', id, this.onMapClickHandler)
          .off('mouseenter', id, this.onMapMouseEnterHandler)
          .off('mouseleave', id, this.onMapMouseLeaveHandler)
  }

  private onMapClickHandler(evt: MapLayerMouseEvent): void {
    this._popupService.addLayerPopup(evt)
  }

  private onMapMouseEnterHandler(): void {
    this._map.getCanvas().style.cursor = 'pointer'
  }

  private onMapMouseLeaveHandler(): void {
    this._map.getCanvas().style.cursor = ''
    this._popupService.removePopup()
  }

  private resetMapFeatures(): void {
    /* reset layers & marker visibility after delay to set mapStyle (basemap) */
    this.resetSkyLayer()
    this.resetLayers()
    this.resetMarkerVisibility()
  }

  private resetSkyLayer(): void {
    setTimeout((): void => this.addSkyLayer(), 100)
  }

  private resetLayers(): void {
    setTimeout((): void => this.addLayers(), 200)
  }

  private resetMarkerVisibility(): void {
    const { mapStyle } = this._mapStyleService
    mapStyle.includes('outdoors')
      ? setTimeout((): void => this.setMarkerVisibility(), 1000)
      : setTimeout((): void => this.setMarkerVisibility(), 200)
  }

  private setMarkerVisibility(): void {
    this._markerService.setMarkerVisibility()
  }
}
