import { LngLatBoundsLike, LngLatLike, Map, NavigationControl } from 'mapbox-gl'
import { Service } from 'typedi'

import store from '@/store'
import { StoreGetters, StoreMutations } from '@/enums'
import { MapOptions, MapSettings } from '@/interfaces'
import { uiConfig } from '@/config'

@Service()
export default class MapboxService {
  constructor(private _map: Map, private _mapStyle: string) {}

  loadMap(): void {
    const { mapSettings } = store.getters[`mapSettings/${StoreGetters.getMapSettings}`]
    const {
      mapbox: {
        navigationControl: { position },
        settings: { accessToken, container, doubleClickZoom, maxZoom, minZoom }
      }
    } = uiConfig
    const mapOptions: MapOptions = {
      accessToken,
      container,
      doubleClickZoom,
      maxZoom,
      minZoom,
      ...mapSettings
    }

    this._mapStyle = mapSettings.style
    this._map = new Map(mapOptions)
      .addControl(new NavigationControl(), position as any)
      .on('load', () => {
        return true
      })
      .on('idle', () => {
        this.setMapSettings()
      })
  }

  private setMapSettings(): void {
    const mapSettings: MapSettings = {
      bearing: this._map.getBearing(),
      bounds: this._map.getBounds() as LngLatBoundsLike,
      center: this._map.getCenter() as LngLatLike,
      pitch: this._map.getPitch(),
      style: this._mapStyle,
      zoom: this._map.getZoom()
    }

    store.commit(`mapSettings/${StoreMutations.setMapSettings}`, mapSettings)
  }
}
