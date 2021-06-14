import mapboxgl, { FillLayer, LineLayer, Map, MapLayerMouseEvent } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { States } from '@/enums'
import { IMapStyle, IStyleLayers, ITrail } from '@/interfaces'
import {
  DataService,
  MapboxService,
  MarkerService,
  PopupService,
  StoreService,
  StyleLayerService
} from '@/services'

@Service()
export default class MapService {
  private _states: Record<string, string> = States

  constructor(
    private _map: Map,
    private _dataService: DataService,
    private _mapboxService: MapboxService,
    private _markerService: MarkerService,
    private _popupService: PopupService,
    private _storeService: StoreService,
    private _styleLayerService: StyleLayerService
  ) {
    this._dataService = Container.get(DataService)
    this._mapboxService = Container.get(MapboxService)
    this._markerService = Container.get(MarkerService)
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
    const { MAP_STYLES } = this._states
    const mapStyles: IMapStyle[] = this._storeService.getState(MAP_STYLES) as IMapStyle[]
    const isActive = (mapStyle: IMapStyle): boolean => mapStyle.isActive
    const { url: style }: IMapStyle = mapStyles.find(isActive)
    this._map.setStyle(style)
    this._mapboxService.mapStyle = style
    /* add style layers after 1/2 sec delay to set basemap style */
    setTimeout((): void => this.addStyleLayers(), 500)
  }

  setStyleLayerVisibility(id: string): void {
    const { STYLE_LAYERS } = this._states
    const styleLayers: IStyleLayers = this._storeService.getState(STYLE_LAYERS) as IStyleLayers
    styleLayers[id as keyof IStyleLayers].isActive
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

  private setStyleLayerVisibilityEventHandlers(id: string, styleLayers: IStyleLayers): void {
    styleLayers[id as keyof IStyleLayers].isActive
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
          /* eslint-disable @typescript-eslint/unbound-method */
          .off('click', id, this.onMapClickHandler)
          .off('mouseenter', id, this.onMapMouseEnterHandler)
          .off('mouseleave', id, this.onMapMouseLeaveHandler)
  }

  private showMarkers(): void {
    setTimeout((): void => this._markerService.showMarkers(), 100)
  }
}
