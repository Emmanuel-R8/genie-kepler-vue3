import cloneDeep from 'lodash/cloneDeep'
import { LngLatLike, Map, NavigationControl } from 'mapbox-gl'
import { Service } from 'typedi'
import { Store } from 'vuex'

import { mapboxSettings } from '@/config'
import { StoreMutations } from '@/enums'
import { MapOptions, MapSettings } from '@/interfaces'
import store from '@/store'

@Service()
export default class MapboxService {
  constructor(
    public map: Map,
    public mapStyle: string,
    private _mapboxSettings: any,
    private _store: Store<any>
  ) {
    this._mapboxSettings = mapboxSettings
    this._store = store
  }

  loadMapbox(): void {
    const {
      navigationControl: { position, visualizePitch },
      settings: { container, doubleClickZoom, maxZoom, minZoom, style }
    } = this._mapboxSettings
    const { mapSettings } = cloneDeep(this._store.getters['mapSettings/getMapSettings'])
    const mapOptions: MapOptions = {
      container,
      doubleClickZoom,
      maxZoom,
      minZoom,
      ...mapSettings
    }

    this.map = new Map(mapOptions)
      .addControl(new NavigationControl({ visualizePitch }), position as any)
      .on('idle', (): void => {
        this.setMapSettings()
      })
    this.mapStyle = style
  }

  private setMapSettings(): void {
    const lat: number = parseFloat(this.map.getCenter().lat.toFixed(6))
    const lng: number = parseFloat(this.map.getCenter().lng.toFixed(6))
    const center: LngLatLike = { lng, lat }
    const mapSettings: MapSettings = {
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
