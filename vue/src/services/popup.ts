import { Feature, Point } from 'geojson'
import { LngLatLike, MapLayerMouseEvent, MapboxGeoJSONFeature, Popup } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { LayerElements } from '@/enums'
import { MapboxService } from '@/services'

@Service()
export default class PopupService {
  private _layerElements: Record<string, string> = LayerElements
  private _popup = new Popup({ closeButton: false })

  constructor(private _mapboxService: MapboxService) {
    this._mapboxService = Container.get(MapboxService)
  }

  addLayerPopup({ features, lngLat }: MapLayerMouseEvent): void {
    if (features?.length && features[0].properties) {
      /* prettier-ignore */
      const { properties: { description, name } }: MapboxGeoJSONFeature = features[0]
      this.setPopupHTML(description, name)
      this._popup.setOffset(4).setLngLat(lngLat).addTo(this._mapboxService.map)
    }
  }

  addMarkerPopup(id: string, feature: Feature): void {
    if (feature?.properties) {
      const { TRAILS } = this._layerElements
      /* prettier-ignore */
      const { geometry, properties: { description, lat, lng, name } } = feature
      this.setPopupHTML(description, name)
      id === TRAILS
        ? this._popup.setLngLat([lng, lat])
        : this._popup.setLngLat((geometry as Point).coordinates as LngLatLike)
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
