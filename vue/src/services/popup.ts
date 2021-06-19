import { Feature, Point } from 'geojson'
import { LngLatLike, MapLayerMouseEvent, Popup } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { MapboxService } from '@/services'

@Service()
export default class PopupService {
  private _popup = new Popup({ closeButton: false })

  constructor(private _mapboxService: MapboxService) {
    this._mapboxService = Container.get(MapboxService)
  }

  addLayerPopup({ features, lngLat }: MapLayerMouseEvent): void {
    if (features?.length && features[0].properties) {
      /* prettier-ignore */
      const { properties: { description, name } } = features[0]
      this.setPopupHTML(description, name)
      this._popup.setLngLat(lngLat).setOffset(4).addTo(this._mapboxService.map)
    }
  }

  addMarkerPopup(feature: Feature): void {
    if (feature?.properties) {
      /* prettier-ignore */
      const { geometry, properties: { description, lat, lng, name } } = feature
      lat && lng
        ? this._popup.setLngLat([lng, lat])
        : this._popup.setLngLat(<LngLatLike>(<Point>geometry).coordinates)
      this.setPopupHTML(description, name)
      this._popup.setOffset(14).addTo(this._mapboxService.map)
    }
  }

  removePopup(): void {
    this._popup.remove()
  }

  private setPopupHTML(description: string, name: string): void {
    this._popup.setHTML(
      `<div class="bold">${name}</div>
       <div>${description}</div>`
    )
  }
}
