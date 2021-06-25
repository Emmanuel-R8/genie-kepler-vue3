import { FillLayer, LineLayer, MapLayerMouseEvent } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { LayerElements } from '@/enums'
import { IStyleLayers, ITrail } from '@/interfaces'
import {
  MapboxService,
  MapStyleService,
  MarkerService,
  PopupService,
  StyleLayerService
} from '@/services'

@Service()
export default class MapService {
  private _layerElements: Record<string, string> = LayerElements

  constructor(
    private _mapboxService: MapboxService,
    private _mapStyleService: MapStyleService,
    private _markerService: MarkerService,
    private _popupService: PopupService,
    private _styleLayerService: StyleLayerService
  ) {
    this._mapboxService = Container.get(MapboxService)
    this._mapStyleService = Container.get(MapStyleService)
    this._markerService = Container.get(MarkerService)
    this._popupService = Container.get(PopupService)
    this._styleLayerService = Container.get(StyleLayerService)
  }

  async loadMapLayer(): Promise<void> {
    !this._mapboxService.accessToken && (await this._mapboxService.getAccessToken())
    this._mapboxService.loadMapbox()
    this._mapboxService.map.on('load', (): void => {
      this.onMapLoadHandler()
    })
  }

  onMapLoadHandler(): void {
    this.showMarkers()
    this.addStyleLayers()
  }

  onMapClickHandler(evt: MapLayerMouseEvent): void {
    this._popupService.addLayerPopup(evt)
  }

  onMapMouseEnterHandler(): void {
    this._mapboxService.map.getCanvas().style.cursor = 'pointer'
  }

  onMapMouseLeaveHandler(): void {
    this._mapboxService.map.getCanvas().style.cursor = ''
    this._popupService.removePopup()
  }

  flyTo({ center, zoom }: ITrail): void {
    this._mapboxService.map.flyTo({
      center,
      zoom
    })
  }

  setMapStyle(): void {
    const mapStyle = this._mapStyleService.mapStyle
    this._mapboxService.map.setStyle(mapStyle)
    /* re-add style layers after 1/2 sec delay to set basemap style */
    setTimeout((): void => this.addStyleLayers(), 500)
  }

  setStyleLayerVisibility(id: string): void {
    const { BIOSPHERE } = this._layerElements
    const styleLayers: IStyleLayers = this._styleLayerService.state
    styleLayers[id as keyof IStyleLayers].isActive
      ? this._mapboxService.map.setLayoutProperty(id, 'visibility', 'visible')
      : this._mapboxService.map.setLayoutProperty(id, 'visibility', 'none')
    id === BIOSPHERE && this.setStyleLayerVisibilityEventHandlers(id, styleLayers)
  }

  private addStyleLayers(): void {
    for (const styleLayer of this._styleLayerService.styleLayers) {
      const { id } = styleLayer
      this._mapboxService.map.addLayer(<FillLayer | LineLayer>styleLayer)
      this.setStyleLayerVisibility(id)
    }
  }

  private setStyleLayerVisibilityEventHandlers(id: string, styleLayers: IStyleLayers): void {
    styleLayers[id as keyof IStyleLayers].isActive
      ? this._mapboxService.map
          .on('click', id, (evt: MapLayerMouseEvent): void => {
            this.onMapClickHandler(evt)
          })
          .on('mouseenter', id, (): void => {
            this.onMapMouseEnterHandler()
          })
          .on('mouseleave', id, (): void => {
            this.onMapMouseLeaveHandler()
          })
      : this._mapboxService.map
          /* eslint-disable @typescript-eslint/unbound-method */
          .off('click', id, this.onMapClickHandler)
          .off('mouseenter', id, this.onMapMouseEnterHandler)
          .off('mouseleave', id, this.onMapMouseLeaveHandler)
  }

  private showMarkers(): void {
    setTimeout((): void => this._markerService.showMarkers(), 100)
  }
}
