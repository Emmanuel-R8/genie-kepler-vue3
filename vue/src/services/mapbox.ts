import cloneDeep from 'lodash/cloneDeep'
import { Map, MapboxOptions, NavigationControl } from 'mapbox-gl'
import { Service } from 'typedi'
import { Store } from 'vuex'

import { mapSettings } from '@/config'
import { StoreMutations } from '@/enums'
import { MapSetting } from '@/interfaces'
import store from '@/store'

@Service()
export default class MapboxService {
  constructor(
    public map: Map,
    public mapStyle: string,
    private _mapOptions: any,
    private _mapSettings: any,
    private _navigationControl: any,
    private _store: Store<any>
  ) {
    this._mapOptions = mapSettings.options
    this._navigationControl = mapSettings.navigationControl
    this._store = store
  }

  loadMapbox(): void {
    const { position, visualizePitch } = this._navigationControl
    this._mapSettings = cloneDeep(this._store.getters['mapSettings/getMapSettings'])
    const options: MapboxOptions = { ...this._mapOptions, ...this._mapSettings }
    const { style } = this._mapSettings
    this.mapStyle = style
    this.map = new Map(options)
      .addControl(new NavigationControl({ visualizePitch }), position)
      .on('idle', (): void => {
        if (
          this.map.getCenter().lat !== this._mapSettings.center.lat ||
          this.map.getCenter().lng !== this._mapSettings.center.lng
        ) {
          this.setMapboxSettings()
        }
      })
  }

  setMapboxSettings(): void {
    const settings: MapSetting = {
      bearing: this.map.getBearing(),
      bounds: this.map.getBounds(),
      center: this.map.getCenter(),
      pitch: this.map.getPitch(),
      style: this.mapStyle,
      zoom: this.map.getZoom()
    }
    this._mapSettings = { ...settings }
    this._store.commit(`mapSettings/${StoreMutations.SET_MAP_SETTINGS}`, settings)
  }
}
