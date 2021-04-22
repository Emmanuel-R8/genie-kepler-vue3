import { LngLatBoundsLike, LngLatLike, Map, NavigationControl } from 'mapbox-gl'
import { Service } from 'typedi'

import store from '@/store'
import { StoreGetters, StoreMutations } from '@/enums'
import { MapOptions, MapSettings } from '@/interfaces'
import { uiConfig } from '@/config'

@Service()
export default class MapboxService {
  constructor(private map: Map, private mapStyle: string) {}

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

    this.mapStyle = mapSettings.style
    this.map = new Map(mapOptions)
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
      bearing: this.map.getBearing(),
      bounds: this.map.getBounds() as LngLatBoundsLike,
      center: this.map.getCenter() as LngLatLike,
      pitch: this.map.getPitch(),
      style: this.mapStyle,
      zoom: this.map.getZoom()
    }

    store.commit(`mapSettings/${StoreMutations.setMapSettings}`, mapSettings)
  }
}
