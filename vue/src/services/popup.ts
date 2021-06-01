import { Feature, Point } from 'geojson'
import { LngLatLike, MapLayerMouseEvent, Popup } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { LayerElements } from '@/enums'
import { MapboxService } from '@/services'

@Service()
export default class PopupService {
  private _layerElements = LayerElements
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

  addMarkerPopup(id: string, feature: Feature): void {
    if (feature?.properties) {
      const { TRAILS } = this._layerElements
      /* prettier-ignore */
      const { geometry, properties: { description, lat, lng, name } } = feature
      id === TRAILS
        ? this._popup.setLngLat({ lng, lat })
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
