import { Map, MapboxOptions, NavigationControl, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/config'
import { States } from '@/enums'
import { IMapboxOptions, IMapboxSettings } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class MapboxService {
  private _MAPBOX_SETTINGS: string = States.MAPBOX_SETTINGS
  private _mapStyle = mapbox.settings.style
  private _navigationControl: Record<string, any> = mapbox.navigationControl
  private _options: IMapboxOptions = mapbox.options
  private _skyLayer: SkyLayer = mapbox.skyLayer as SkyLayer

  constructor(private _map: Map, private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  get map(): Map {
    return this._map
  }
  set mapStyle(mapStyle: string) {
    this._mapStyle = mapStyle
  }
  private get _state(): IMapboxSettings {
    return this._storeService.getState(this._MAPBOX_SETTINGS)
  }
  private set _state(settings: IMapboxSettings) {
    this._storeService.setState(this._MAPBOX_SETTINGS, settings)
  }

  loadMapbox(): void {
    const { position, visualizePitch } = this._navigationControl
    const options: MapboxOptions = { ...this._options, ...this._state }
    const { style } = this._state
    this._mapStyle = style
    this._map = new Map(options)
      .addControl(new NavigationControl({ visualizePitch }), position)
      .on('load', (): void => {
        this.onMapLoadHandler()
      })
      .on('idle', (): void => {
        this.onMapIdleHandler()
      })
  }

  onMapIdleHandler(): void {
    this.setMapboxSettingsState()
  }

  onMapLoadHandler(): void {
    this._map.addLayer(this._skyLayer)
  }

  private setMapboxSettingsState(): void {
    const lat = +this._map.getCenter().lat.toFixed(6)
    const lng = +this._map.getCenter().lng.toFixed(6)
    this._state = {
      bearing: +this._map.getBearing().toFixed(2),
      center: { lng, lat },
      pitch: +this._map.getPitch().toFixed(2),
      style: this._mapStyle,
      zoom: +this._map.getZoom().toFixed(2)
    }
  }
}
