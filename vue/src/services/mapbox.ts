import {
  FillLayer,
  LineLayer,
  LngLatBoundsLike,
  LngLatLike,
  Map,
  Marker,
  NavigationControl,
  Popup
} from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { ui } from '@/config'
import { StoreMutations } from '@/enums'
import { MapOptions, MapSettings } from '@/interfaces'
import { LayerService } from '@/services'
import store from '@/store'

@Service()
export default class MapboxService {
  constructor(private _layerService: LayerService, private _map: Map, private _mapStyle: string) {
    this._layerService = Container.get(LayerService)
  }

  loadMapbox(): void {
    const {
      navigationControl: { position },
      settings: { container, doubleClickZoom, maxZoom, minZoom, style }
    } = ui
    const { mapSettings } = store.getters['mapSettings/getMapSettings']
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
        this.addLayers()
      })
      .on('idle', () => {
        this.setMapSettings()
      })
  }

  addToMap(el: Marker | Popup): void {
    el.addTo(this._map)
  }

  addLayer(layer: FillLayer | LineLayer): void {
    if (layer.source) {
      const { id } = layer
      this._map.addLayer(layer)
      this.setLayerVisibility(id)
    }
  }

  setLayerVisibility(id: string): void {
    const { layers } = store.getters['layers/getLayersVisibility']
    layers[id].active
      ? this._map.setLayoutProperty(id, 'visibility', 'visible')
      : this._map.setLayoutProperty(id, 'visibility', 'none')
  }

  private addLayers(): void {
    for (const layer of this._layerService.layers) {
      this.addLayer(layer)
    }
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
    store.commit(`mapSettings/${StoreMutations.SET_MAP_SETTINGS}`, mapSettings)
  }
}
