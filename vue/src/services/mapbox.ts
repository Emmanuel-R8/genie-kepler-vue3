import cloneDeep from 'lodash/cloneDeep'
import { LngLatLike, Map, MapboxOptions, NavigationControl } from 'mapbox-gl'
import { Service } from 'typedi'

import { mapbox } from '@/config'
import { IMapOptions, IMapSettings, IStore } from '@/interfaces'
import { store } from '@/store'

@Service()
export default class MapboxService {
  constructor(
    public map: Map,
    public mapStyle: string,
    private _mapOptions: IMapOptions,
    private _mapSettings: IMapSettings,
    private _navigationControl: Record<string, any>,
    private _store: IStore
  ) {
    this._mapOptions = mapbox.mapOptions
    this._navigationControl = mapbox.navigationControl
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
    this._store.setters.setMapSettingsState(this._mapSettings)
  }
}
