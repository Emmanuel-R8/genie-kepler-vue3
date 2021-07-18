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
    private _popupService: PopupService
  ) {
    this._layerService = Container.get(LayerService)
    this._layerVisibilityService = Container.get(LayerVisibilityService)
    this._mapboxService = Container.get(MapboxService)
    this._mapStyleService = Container.get(MapStyleService)
    this._markerService = Container.get(MarkerService)
    this._popupService = Container.get(PopupService)
  }

  async loadMapLayer(): Promise<void> {
    const { accessToken } = this._mapboxService
    !accessToken && (await this._mapboxService.getAccessToken())
    this._mapboxService.loadMapbox()
    this._map = this._mapboxService.map
    this._map.on('load', (): void => {
      this.onMapLoadHandler()
    })
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
    this.addLayers()
  }

  private addLayers(): void {
    this._map.addLayer(this._skyLayer)
    const { layers } = this._layerService
    for (const layer of layers) {
      const { id } = layer
      this._map.addLayer(<FillLayer | LineLayer>layer)
      this.setLayerVisibility(id)
    }
  }

  private setLayerVisibilityEventListeners(id: string, layers: ILayerVisibility): void {
    layers[id as keyof ILayerVisibility].isActive
      ? this._map
          .on('click', id, (evt: MapLayerMouseEvent): void => this.onMapClickHandler(evt))
          .on('mouseenter', id, (): void => this.onMapMouseEnterHandler())
          .on('mouseleave', id, (): void => this.onMapMouseLeaveHandler())
      : this._map
          /* eslint-disable @typescript-eslint/unbound-method */
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
    /* reset layers & markers after delay to set mapStyle (basemap) */
    setTimeout((): void => this.addLayers(), 200)
    setTimeout((): void => this.setMarkerVisibility(), 800)
  }

  private setMarkerVisibility(): void {
    this._markerService.setMarkerVisibility()
  }
}
