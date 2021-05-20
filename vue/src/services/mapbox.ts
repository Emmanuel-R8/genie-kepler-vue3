import { LngLatLike, Map, MapboxOptions, NavigationControl } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/config'
import { IMapboxOptions, IMapboxSettings } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class MapboxService {
  private _mapStyle = ''
  private _navigationControl: Record<string, any> = mapbox.navigationControl
  private _options: IMapboxOptions = mapbox.options
  private _settings: IMapboxSettings = mapbox.settings

  constructor(private _map: Map, private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  get map(): Map {
    return this._map
  }

  set mapStyle(style: string) {
    this._mapStyle = style
  }

  loadMapbox(): void {
    const { position, visualizePitch } = this._navigationControl
    this._settings = this._storeService.getMapboxSettingsState()
    const options: MapboxOptions = { ...this._options, ...this._settings }
    const { style } = this._settings
    this._mapStyle = style
    this._map = new Map(options)
      .addControl(new NavigationControl({ visualizePitch }), position)
      .on('idle', (): void => {
        this.setMapboxSettings()
      })
  }

  setMapboxSettings(): void {
    const lat: number = +this._map.getCenter().lat.toFixed(6)
    const lng: number = +this._map.getCenter().lng.toFixed(6)
    const center: LngLatLike = { lng, lat }
    const settings: IMapboxSettings = {
      bearing: +this._map.getBearing().toFixed(1),
      center,
      pitch: +this._map.getPitch().toFixed(1),
      style: this._mapStyle,
      zoom: +this._map.getZoom().toFixed(2)
    }
    this._storeService.setMapboxSettingsState({ ...settings })
  }
}
