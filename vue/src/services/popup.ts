import { Feature, Point } from 'geojson'
import { LngLatLike, MapLayerMouseEvent, Popup } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { MapboxService } from '@/services'

@Service()
export default class PopupService {
  constructor(private _mapboxService: MapboxService, private _popup: Popup) {
    this._mapboxService = Container.get(MapboxService)
    this._popup = new Popup({
      closeButton: false,
      offset: 5
    })
  }

  addLayerPopup(evt: MapLayerMouseEvent): void {
    if (evt.features && evt.features.length && evt.features[0].properties) {
      this._popup
        .setHTML(
          `<div class="bold">${evt.features[0].properties.name}</div>
           <div>${evt.features[0].properties.description}</div>`
        )
        .setLngLat(evt.lngLat)
        .addTo(this._mapboxService.map)
    }
  }

  addMarkerPopup(layer: string, feature: Feature): void {
    if (feature?.properties) {
      layer === 'trails'
        ? this._popup.setLngLat([feature.properties.lng, feature.properties.lat] as LngLatLike)
        : this._popup.setLngLat((feature.geometry as Point).coordinates as LngLatLike)

      this._popup
        .setHTML(
          `<div class="bold">${feature.properties.name}</div>
         <div>${feature.properties.description}</div>`
        )
        .addTo(this._mapboxService.map)
    }
  }

  removePopup(): void {
    this._popup.remove()
  }
}
