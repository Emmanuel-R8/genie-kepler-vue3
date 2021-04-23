import { LngLatBoundsLike, LngLatLike, Map, NavigationControl } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { ui } from '@/config'
import { StoreGetters, StoreMutations } from '@/enums'
import { MapOptions, MapSettings } from '@/interfaces'
import { DataService } from '@/services'
import store from '@/store'

@Service()
export default class MapboxService {
  constructor(private _map: Map, private _mapStyle: string) {}

  loadMapbox(): void {
    const { mapSettings } = store.getters[`mapSettings/${StoreGetters.getMapSettings}`]
    const {
      mapbox: {
        navigationControl: { position },
        settings: { container, doubleClickZoom, maxZoom, minZoom, style }
      }
    } = ui
    const mapOptions: MapOptions = {
      container,
      doubleClickZoom,
      maxZoom,
      minZoom,
      ...mapSettings
    }

    this._mapStyle = style
    this._map = new Map(mapOptions)
      .addControl(new NavigationControl(), position as any)
      .on('load', () => {
        const dataService: DataService = Container.get(DataService)
        dataService.loadData()
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
