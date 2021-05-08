import cloneDeep from 'lodash/cloneDeep'
import { LngLatLike, Map, MapboxOptions, NavigationControl } from 'mapbox-gl'
import { Service } from 'typedi'

import { mapSettings } from '@/config'
import { IMapSetting, IStore } from '@/interfaces'
import { store } from '@/store'

@Service()
export default class MapboxService {
  constructor(
    public map: Map,
    public mapStyle: string,
    private _mapOptions: any,
    private _mapSettings: Record<string, any>,
    private _navigationControl: Record<string, any>,
    private _store: IStore
  ) {
    this._mapOptions = mapSettings.options
    this._navigationControl = mapSettings.navigationControl
    this._store = store
  }

  loadMapbox(): void {
    const { position, visualizePitch } = this._navigationControl
    this._mapSettings = cloneDeep(this._store.getters.getMapSettingsState())
    const options: MapboxOptions = { ...this._mapOptions, ...this._mapSettings }
    const { style } = this._mapSettings
    this.mapStyle = style
    this.map = new Map(options)
      .addControl(new NavigationControl({ visualizePitch }), position)
      .on('idle', (): void => {
        this.setMapboxSettings()
      })
  }

  setMapboxSettings(): void {
    const lat: number = parseFloat(this.map.getCenter().lat.toFixed(6))
    const lng: number = parseFloat(this.map.getCenter().lng.toFixed(6))
    const center: LngLatLike = { lng, lat }
    const settings: IMapSetting = {
      bearing: parseFloat(this.map.getBearing().toFixed(2)),
      bounds: this.map.getBounds(),
      center,
      pitch: parseFloat(this.map.getPitch().toFixed(2)),
      style: this.mapStyle,
      zoom: parseFloat(this.map.getZoom().toFixed(2))
    }
    this._mapSettings = { ...settings }
    this._store.setters.setMapSettingsState(this._mapSettings)
  }
}
