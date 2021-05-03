import { Feature, Point } from 'geojson'
import { LngLatLike, MapLayerMouseEvent, Popup } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { MapService } from '@/services'

@Service()
export default class PopupService {
  constructor(private _mapService: MapService, private _popup: Popup) {
    this._mapService = Container.get(MapService)
    this._popup = new Popup({
      closeButton: false,
      offset: 14
    })
  }

  addLayerPopup(evt: MapLayerMouseEvent): void {
    const { features, lngLat } = evt
    if (features && features.length && features[0].properties) {
      this._popup
        .setHTML(
          `<div class="bold">${features[0].properties.name}</div>
           <div>${features[0].properties.description}</div>`
        )
        .setLngLat(lngLat)
        .addTo(this._mapService.map)
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
        .addTo(this._mapService.map)
    }
  }

  removePopup(): void {
    this._popup.remove()
  }
}
