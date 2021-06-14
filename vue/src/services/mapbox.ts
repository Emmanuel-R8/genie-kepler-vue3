import { Map, MapboxOptions, NavigationControl, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/config'
import { States } from '@/enums'
import { IMapboxOptions, IMapboxSettings } from '@/interfaces'
import { ModalService, StoreService } from '@/services'

type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

@Service()
export default class MapboxService {
  private _mapStyle = mapbox.settings.style
  private _navigationControl = mapbox.navigationControl
  private _options: IMapboxOptions = mapbox.options
  private _skyLayer = mapbox.skyLayer as SkyLayer
  private _states: Record<string, string> = States

  constructor(
    private _map: Map,
    private _modalService: ModalService,
    private _storeService: StoreService
  ) {
    this._modalService = Container.get(ModalService)
    this._storeService = Container.get(StoreService)
  }

  get map(): Map {
    return this._map
  }
  set mapStyle(mapStyle: string) {
    this._mapStyle = mapStyle
  }
  private get _state(): IMapboxSettings {
    const { MAPBOX_SETTINGS } = this._states
    return this._storeService.getState(MAPBOX_SETTINGS) as IMapboxSettings
  }
  private set _state(settings: IMapboxSettings) {
    const { MAPBOX_SETTINGS } = this._states
    this._storeService.setState(MAPBOX_SETTINGS, settings)
  }

  loadMapbox(): void {
    const { position, visualizePitch } = this._navigationControl
    const options: MapboxOptions = { ...this._options, ...this._state }
    const { style } = this._state
    this._mapStyle = style
    this._map = new Map(options)
      .addControl(new NavigationControl({ visualizePitch }), position as Position)
      .on('load', (): void => {
        this.onMapLoadHandler()
      })
      .on('idle', (): void => {
        this.onMapIdleHandler()
      })
  }

  onMapLoadHandler(): void {
    this.addSkyLayer()
    this.hideModal()
  }

  onMapIdleHandler(): void {
    this.setMapboxSettingsState()
  }

  private setMapboxSettingsState(): void {
    const lat = +this._map.getCenter().lat.toFixed(6)
    const lng = +this._map.getCenter().lng.toFixed(6)
    this._state = {
      bearing: +this._map.getBearing().toFixed(2),
      center: [lng, lat],
      pitch: +this._map.getPitch().toFixed(2),
      style: this._mapStyle,
      zoom: +this._map.getZoom().toFixed(2)
    }
  }

  private addSkyLayer(): void {
    this._map.addLayer(this._skyLayer)
  }

  private hideModal(): void {
    this._modalService.hideModal(100)
  }
}
