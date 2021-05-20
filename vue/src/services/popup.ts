import { Feature, Point } from 'geojson'
import { LngLatLike, MapLayerMouseEvent, Popup } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { MapboxService } from '@/services'

@Service()
export default class PopupService {
  private _popup = new Popup({
    closeButton: false
  })

  constructor(private _mapboxService: MapboxService) {
    this._mapboxService = Container.get(MapboxService)
  }

  addLayerPopup({ features, lngLat }: MapLayerMouseEvent): void {
    if (features && features.length && features[0].properties) {
      this._popup
        .setHTML(
          `<div class="bold">${features[0].properties.name}</div>
           <div>${features[0].properties.description}</div>`
        )
        .setOffset(4)
        .setLngLat(lngLat)
        .addTo(this._mapboxService.map)
    }
  }

  addMarkerPopup(layer: string, feature: Feature): void {
    /* prettier-ignore */
    if (feature?.properties) {
      const { geometry, properties: { description, lat, lng, name } } = feature
      layer === 'trails'
        ? this._popup.setLngLat({ lat, lng })
        : this._popup.setLngLat((geometry as Point).coordinates as LngLatLike)
      this._popup
        .setHTML(
          `<div class="bold">${name}</div>
         <div>${description}</div>`
        )
        .setOffset(14)
        .addTo(this._mapboxService.map)
    }
  }

  removePopup(): void {
    this._popup.remove()
  }
}
