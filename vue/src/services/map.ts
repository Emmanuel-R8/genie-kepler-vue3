import mapboxgl, {
  FillLayer,
  LineLayer,
  LngLatLike,
  Map,
  MapLayerMouseEvent,
  SkyLayer
} from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/config'
import { LayerElements, StoreStates } from '@/enums'
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
  private _MAP_STYLES: string = StoreStates.MAP_STYLES
  private _STYLE_LAYERS_VISIBILITY: string = StoreStates.STYLE_LAYERS_VISIBILITY
  private _layerElements: Record<string, any> = LayerElements
  private _skyLayer: SkyLayer = mapbox.skyLayer as SkyLayer

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
      this.hideModal()
      this.showMarkers()
      this.addLayers()
    })
  }

  addLayers(): void {
    this._map.addLayer(this._skyLayer)
    for (const layer of this._styleLayerService.styleLayers) {
      this.addStyleLayer(layer)
    }
  }

  flyTo({ center, zoom }: ITrail): void {
    this._map.flyTo({
      center: center as LngLatLike,
      zoom
    })
  }

  setMapStyle(): void {
    const mapStyles: IMapStyle = this._storeService.getState(this._MAP_STYLES)
    const visible = (mapStyle: IMapStyle): boolean => mapStyle.visible
    const { url: mapStyle } = Object.values(mapStyles).find(visible)
    this._map.setStyle(mapStyle)
    this._mapboxService.mapStyle = mapStyle
    /* add layers after 1 sec delay to set basemap style */
    setTimeout((): void => this.addLayers(), 1000)
  }

  setStyleLayerVisibility(id: string): void {
    const styleLayers: IStyleLayer = this._storeService.getState(this._STYLE_LAYERS_VISIBILITY)
    styleLayers[id as keyof IStyleLayer].visible
      ? this._map.setLayoutProperty(id, 'visibility', 'visible')
      : this._map.setLayoutProperty(id, 'visibility', 'none')

    const { BIOSPHERE } = this._layerElements
    if (styleLayers[id as keyof IStyleLayer].visible && id === BIOSPHERE) {
      this.setStyleLayerEventHandlers(id)
    }
  }

  private addStyleLayer(layer: FillLayer | LineLayer): void {
    const { id } = layer
    this._map.addLayer(layer)
    this.setStyleLayerVisibility(id)
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

  private hideModal(): void {
    this._modalService.hideModal(0.5)
  }

  private showMarkers(): void {
    setTimeout((): void => this._markerService.showMarkers(), 0.5)
  }
}
