import { LngLatLike, Map, MapboxOptions, NavigationControl } from 'mapbox-gl'
import { Service } from 'typedi'
import { Store } from 'vuex'

import { map_settings } from '@/config'
import { StoreMutations } from '@/enums'
import { MapSetting } from '@/interfaces'
import store from '@/store'

@Service()
export default class MapboxService {
  constructor(
    public map: Map,
    public mapStyle: string,
    private _mapSettings: any,
    private _store: Store<any>
  ) {
    this._mapSettings = map_settings
    this._store = store
  }

  loadMapbox(): void {
    const {
      navigationControl: { position, visualizePitch },
      options: { container, doubleClickZoom, maxZoom, minZoom, style }
    } = this._mapSettings
    const { mapSettings } = this._store.getters['mapSettings/getMapSettings']
    const options: MapboxOptions = {
      container,
      doubleClickZoom,
      maxZoom,
      minZoom,
      ...mapSettings
    }

    this.map = new Map(options)
      .addControl(new NavigationControl({ visualizePitch }), position)
      .on('idle', (): void => {
        this.setMapSettings()
      })
    this.mapStyle = style
  }

  private setMapSettings(): void {
    const lat: number = parseFloat(this.map.getCenter().lat.toFixed(6))
    const lng: number = parseFloat(this.map.getCenter().lng.toFixed(6))
    const center: LngLatLike = { lng, lat }
    const mapSettings: MapSetting = {
      bearing: parseFloat(this.map.getBearing().toFixed(2)),
      bounds: this.map.getBounds(),
      center,
      pitch: parseFloat(this.map.getPitch().toFixed(2)),
      style: this.mapStyle,
      zoom: parseFloat(this.map.getZoom().toFixed(2))
    }
    this._store.commit(`mapSettings/${StoreMutations.SET_MAP_SETTINGS}`, mapSettings)
  }
}
