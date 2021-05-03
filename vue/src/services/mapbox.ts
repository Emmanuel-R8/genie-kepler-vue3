import { LngLatLike, Map, MapboxOptions, NavigationControl } from 'mapbox-gl'
import { Service } from 'typedi'
import { Store } from 'vuex'

import { map_settings } from '@/config'
import { StoreMutations } from '@/enums'
import store from '@/store'

@Service()
export default class MapboxService {
  constructor(
    public map: Map,
    public mapStyle: string,
    private _mapOptions: any,
    private _mapSettings: any,
    private _store: Store<any>
  ) {
    this._mapOptions = map_settings
    this._mapSettings = {}
    this._store = store
  }

  loadMapbox(): void {
    const {
      navigationControl: { position, visualizePitch },
      options: { container, doubleClickZoom, maxZoom, minZoom, style }
    } = this._mapOptions
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
    this._mapSettings = { ...mapSettings }
  }

  private setMapSettings(): void {
    const lat: number = parseFloat(this.map.getCenter().lat.toFixed(6))
    const lng: number = parseFloat(this.map.getCenter().lng.toFixed(6))
    const center: LngLatLike = { lng, lat }
    const settings: Record<string, any> = {
      bearing: parseFloat(this.map.getBearing().toFixed(2)),
      bounds: this.map.getBounds(),
      center,
      pitch: parseFloat(this.map.getPitch().toFixed(2)),
      style: this.mapStyle,
      zoom: parseFloat(this.map.getZoom().toFixed(2))
    }

    if (this._mapSettings.bounds && this._mapSettings.bounds._ne.lat !== settings.bounds._ne.lat) {
      this._store.commit(`mapSettings/${StoreMutations.SET_MAP_SETTINGS}`, settings)
    }

    this._mapSettings = { ...settings }
  }
}
