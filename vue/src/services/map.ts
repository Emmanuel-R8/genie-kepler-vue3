import { FillLayer, LineLayer, MapLayerMouseEvent } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { LayerElements } from '@/enums'
import { ILayers, ITrail } from '@/interfaces'
import { LayerService, MapboxService, MapStyleService, PopupService } from '@/services'

@Service()
export default class MapService {
  private _layerElements: Record<string, string> = LayerElements

  constructor(
    private _layerService: LayerService,
    private _mapboxService: MapboxService,
    private _mapStyleService: MapStyleService,
    private _popupService: PopupService
  ) {
    this._layerService = Container.get(LayerService)
    this._mapboxService = Container.get(MapboxService)
    this._mapStyleService = Container.get(MapStyleService)
    this._popupService = Container.get(PopupService)
  }

  async loadMapLayer(): Promise<void> {
    !this._mapboxService.accessToken && (await this._mapboxService.getAccessToken())
    this._mapboxService.loadMapbox()
    this._mapboxService.map.on('load', (): void => {
      this.onMapLoadHandler()
    })
  }

  onMapLoadHandler(): void {
    this.addLayers()
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
    /* re-add style layers after 1/2 sec delay to set mapStyle */
    setTimeout((): void => this.addLayers(), 500)
  }

  setLayerVisibility(id: string): void {
    const { BIOSPHERE } = this._layerElements
    const layers: ILayers = this._layerService.state
    layers[id as keyof ILayers].isActive
      ? this._mapboxService.map.setLayoutProperty(id, 'visibility', 'visible')
      : this._mapboxService.map.setLayoutProperty(id, 'visibility', 'none')
    id === BIOSPHERE && this.setLayerVisibilityEventHandlers(id, layers)
  }

  private addLayers(): void {
    for (const layer of this._layerService.layers) {
      const { id } = layer
      this._mapboxService.map.addLayer(<FillLayer | LineLayer>layer)
      this.setLayerVisibility(id)
    }
  }

  private setLayerVisibilityEventHandlers(id: string, layers: ILayers): void {
    layers[id as keyof ILayers].isActive
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
}
