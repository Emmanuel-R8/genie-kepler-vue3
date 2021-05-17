import cloneDeep from 'lodash/cloneDeep'
import { LngLatLike, Map, MapboxOptions, NavigationControl } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/config'
import { IMapOptions, IMapSettings } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class MapboxService {
  private _mapOptions: IMapOptions = mapbox.mapOptions
  private _navigationControl: Record<string, any> = mapbox.navigationControl

  constructor(
    public map: Map,
    public mapStyle: string,
    private _mapSettings: IMapSettings,
    private _storeService: StoreService
  ) {
    this._storeService = Container.get(StoreService)
  }

  loadMapbox(): void {
    const { position, visualizePitch } = this._navigationControl
    this._mapSettings = cloneDeep(this._storeService.getMapSettingsState())
    const options: MapboxOptions = { ...this._mapOptions, ...this._mapSettings }
    const { style } = this._mapSettings
    this.mapStyle = style
    this.map = new Map(options)
      .addControl(new NavigationControl({ visualizePitch }), position)
      .on('idle', (): void => {
        this.setMapSettings()
      })
  }

  setMapSettings(): void {
    const lat: number = +this.map.getCenter().lat.toFixed(6)
    const lng: number = +this.map.getCenter().lng.toFixed(6)
    const center: LngLatLike = { lng, lat }
    const settings: IMapSettings = {
      bearing: +this.map.getBearing().toFixed(1),
      center,
      pitch: +this.map.getPitch().toFixed(1),
      style: this.mapStyle,
      zoom: +this.map.getZoom().toFixed(1)
    }
    this._mapSettings = { ...settings }
    this._storeService.setMapSettingsState(this._mapSettings)
  }
}
