import mapboxgl, { FillLayer, LineLayer, Map, MapLayerMouseEvent } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { LayerElements } from '@/enums'
import { IMapStyle, IStyleLayers, ITrail } from '@/interfaces'
import {
  DataService,
  MapboxService,
  MapStylesService,
  MarkerService,
  PopupService,
  StyleLayerService
} from '@/services'

@Service()
export default class MapService {
  private _layerElements: Record<string, string> = LayerElements

  constructor(
    private _map: Map,
    private _dataService: DataService,
    private _mapboxService: MapboxService,
    private _mapStylesService: MapStylesService,
    private _markerService: MarkerService,
    private _popupService: PopupService,
    private _styleLayerService: StyleLayerService
  ) {
    this._dataService = Container.get(DataService)
    this._mapboxService = Container.get(MapboxService)
    this._mapStylesService = Container.get(MapStylesService)
    this._markerService = Container.get(MarkerService)
    this._popupService = Container.get(PopupService)
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
    const mapStyles: IMapStyle[] = this._mapStylesService.state
    const isActive = (mapStyle: IMapStyle): boolean => mapStyle.isActive
    const i = mapStyles.findIndex(isActive)
    const { url: style } = mapStyles[i]
    this._map.setStyle(style)
    this._mapboxService.mapStyle = style
    /* re-add style layers after 1/2 sec delay to set basemap style */
    setTimeout((): void => this.addStyleLayers(), 500)
  }

  setStyleLayerVisibility(id: string): void {
    const { BIOSPHERE } = this._layerElements
    const styleLayers: IStyleLayers = this._styleLayerService.state
    styleLayers[id as keyof IStyleLayers].isActive
      ? this._map.setLayoutProperty(id, 'visibility', 'visible')
      : this._map.setLayoutProperty(id, 'visibility', 'none')
    id === BIOSPHERE && this.setStyleLayerVisibilityEventHandlers(id, styleLayers)
  }

  private addStyleLayers(): void {
    for (const styleLayer of this._styleLayerService.styleLayers) {
      const { id } = styleLayer
      this._map.addLayer(<FillLayer | LineLayer>styleLayer)
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
