import { Feature, Point } from 'geojson'
import { LngLat, LngLatLike, MapLayerMouseEvent, Popup } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { MapboxService } from '@/services'

@Service()
export default class PopupService {
  constructor(private _mapboxService: MapboxService, private _popup: Popup) {
    this._mapboxService = Container.get(MapboxService)
    this._popup = new Popup({ closeButton: false })
  }

  addLayerPopup({ features, lngLat }: MapLayerMouseEvent): void {
    if (features?.length && features[0]) {
      this.setLayerPopupLngLat(lngLat)
      this.setHTML(features[0])
      this.setOffset(4)
      this.addToMap()
    }
  }

  addMarkerPopup(feature: Feature): void {
    if (feature) {
      this.setMakerPopupLngLat(feature)
      this.setHTML(feature)
      this.setOffset(14)
      this.addToMap()
    }
  }

  removePopup(): void {
    this._popup.remove()
  }

  private addToMap(): void {
    const { map } = this._mapboxService
    this._popup.addTo(map)
  }

  private setLayerPopupLngLat(lngLat: LngLat): void {
    this._popup.setLngLat(lngLat)
  }

  private setMakerPopupLngLat(feature: Feature): void {
    if (feature.properties) {
      /* prettier-ignore */
      const { geometry, properties: { lat, lng } } = feature
      lat && lng ? this._popup.setLngLat([lng, lat]) : this._popup.setLngLat(<LngLatLike>(<Point>geometry).coordinates)
    }
  }

  private setHTML(feature: Feature): void {
    const { properties } = feature
    if (properties) {
      const { description, name } = properties
      this._popup.setHTML(
        `<div class="bold">${name}</div>
         <div>${description}</div>`
      )
    }
  }

  private setOffset(offset: number): void {
    this._popup.setOffset(offset)
  }
}
