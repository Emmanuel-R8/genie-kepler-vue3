import cloneDeep from 'lodash/cloneDeep'
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
import { IMapStyle, IModal, IStore, IStyleLayer, ITrail } from '@/interfaces'
import {
  DataService,
  MapboxService,
  MarkerService,
  PopupService,
  StyleLayerService
} from '@/services'
import { store } from '@/store'

@Service()
export default class MapService {
  constructor(
    public map: Map,
    private _dataService: DataService,
    private _mapboxService: MapboxService,
    private _markerService: MarkerService,
    private _popupService: PopupService,
    private _styleLayerService: StyleLayerService,
    private _skyLayer: SkyLayer,
    private _store: IStore
  ) {
    this._dataService = Container.get(DataService)
    this._mapboxService = Container.get(MapboxService)
    this._markerService = Container.get(MarkerService)
    this._popupService = Container.get(PopupService)
    this._styleLayerService = Container.get(StyleLayerService)
    this._skyLayer = mapbox.skyLayer as SkyLayer
    this._store = store
  }

  async loadMap(): Promise<void> {
    !mapboxgl.accessToken && (await this._dataService.getMapboxAccessToken())

    this._mapboxService.loadMapbox()
    this.map = this._mapboxService.map
    this.map.on('load', (): void => {
      this.showMarkers()
      this.addLayers()
    })
  }

  addLayers(): void {
    this.map.addLayer(this._skyLayer)
    for (const layer of this._styleLayerService.styleLayers) {
      this.addStyleLayer(layer)
    }
    this.showModal()
  }

  flyTo({ center, zoom }: ITrail): void {
    this.map.flyTo({
      center: center as LngLatLike,
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
    this._mapboxService.setMapSettings()
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

  private addStyleLayer(layer: FillLayer | LineLayer): void {
    const { id } = layer
    this.map.addLayer(layer)
    this.setStyleLayerVisibility(id)
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

  private showMarkers(): void {
    setTimeout((): void => this._markerService.showMarkers(), 0.5)
  }

  private showModal(): void {
    const modal: IModal = cloneDeep(store.getters.getModalState())
    modal.show && setTimeout((): void => this._store.setters.setModalState(), 0.5)
  }
}
