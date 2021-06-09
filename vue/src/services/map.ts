import mapboxgl, { FillLayer, LineLayer, Map, MapLayerMouseEvent } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { States } from '@/enums'
import { IMapStyle, IStyleLayer, ITrail } from '@/interfaces'
import {
  DataService,
  MapboxService,
  MarkerService,
  ModalService,
  PopupService,
  StoreService,
  StyleLayerService
} from '@/services'

@Service()
export default class MapService {
  private _MAP_STYLES: string = States.MAP_STYLES
  private _STYLE_LAYERS: string = States.STYLE_LAYERS

  constructor(
    private _map: Map,
    private _dataService: DataService,
    private _mapboxService: MapboxService,
    private _markerService: MarkerService,
    private _modalService: ModalService,
    private _popupService: PopupService,
    private _storeService: StoreService,
    private _styleLayerService: StyleLayerService
  ) {
    this._dataService = Container.get(DataService)
    this._mapboxService = Container.get(MapboxService)
    this._markerService = Container.get(MarkerService)
    this._modalService = Container.get(ModalService)
    this._popupService = Container.get(PopupService)
    this._storeService = Container.get(StoreService)
    this._styleLayerService = Container.get(StyleLayerService)
  }

  get map(): Map {
    return this._map
  }

  async loadMapLayer(): Promise<void> {
    !mapboxgl.accessToken && (await this._dataService.getMapboxAccessToken())

    this._mapboxService.loadMapbox()
    this._map = this._mapboxService.map
    this._map.on('load', (): void => {
      this.onMapLoadHandler()
    })
  }

  onMapLoadHandler(): void {
    this.hideModal()
    this.showMarkers()
    this.addStyleLayers()
  }

  onMapClickHandler(evt: MapLayerMouseEvent): void {
    this._popupService.addLayerPopup(evt)
  }

  onMapMouseEnterHandler(): void {
    this._map.getCanvas().style.cursor = 'pointer'
  }

  onMapMouseLeaveHandler(): void {
    this._map.getCanvas().style.cursor = ''
    this._popupService.removePopup()
  }

  flyTo({ center, zoom }: ITrail): void {
    this._map.flyTo({
      center,
      zoom
    })
  }

  setMapStyle(): void {
    const mapStyles: IMapStyle = this._storeService.getState(this._MAP_STYLES)
    const isActive = (mapStyle: IMapStyle): boolean => mapStyle.isActive
    const { url: mapStyle } = Object.values(mapStyles).find(isActive)
    this._map.setStyle(mapStyle)
    this._mapboxService.mapStyle = mapStyle
    /* add style layers after 1/2 sec delay to set basemap style */
    setTimeout((): void => this.addStyleLayers(), 500)
  }

  setStyleLayerVisibility(id: string): void {
    const styleLayers: IStyleLayer = this._storeService.getState(this._STYLE_LAYERS)
    styleLayers[id as keyof IStyleLayer].isActive
      ? this._map.setLayoutProperty(id, 'visibility', 'visible')
      : this._map.setLayoutProperty(id, 'visibility', 'none')
    this.setStyleLayerVisibilityEventHandlers(id, styleLayers)
  }

  private addStyleLayers(): void {
    for (const styleLayer of this._styleLayerService.styleLayers) {
      const { id } = styleLayer
      this._map.addLayer(styleLayer as FillLayer | LineLayer)
      this.setStyleLayerVisibility(id)
    }
  }

  private setStyleLayerVisibilityEventHandlers(id: string, styleLayers: IStyleLayer): void {
    styleLayers[id as keyof IStyleLayer].isActive
      ? this._map
          .on('click', id, (evt: MapLayerMouseEvent): void => {
            this.onMapClickHandler(evt)
          })
          .on('mouseenter', id, (): void => {
            this.onMapMouseEnterHandler()
          })
          .on('mouseleave', id, (): void => {
            this.onMapMouseLeaveHandler()
          })
      : this._map
          .off('click', id, (evt: MapLayerMouseEvent): void => {
            this.onMapClickHandler(evt)
          })
          .off('mouseenter', id, (): void => {
            this.onMapMouseEnterHandler()
          })
          .off('mouseleave', id, (): void => {
            this.onMapMouseLeaveHandler()
          })
  }

  private hideModal(): void {
    this._modalService.hideModal(100)
  }

  private showMarkers(): void {
    setTimeout((): void => this._markerService.showMarkers(), 100)
  }
}
