import { Feature, Point } from 'geojson'
import { LngLatLike, MapLayerMouseEvent, Popup } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { MapboxService } from '@/services'

@Service()
export default class PopupService {
    constructor(private _mapboxService: MapboxService, private _popup: Popup) {
        this._mapboxService = Container.get(MapboxService)
        this._popup = new Popup({ closeButton: false })
    }

    addLayerPopup({ features, lngLat }: MapLayerMouseEvent): void {
        if (features?.length && features[0].properties) {
            const { map } = this._mapboxService
            /* prettier-ignore */
            const { properties: { description, name } } = features[0]
            this.setPopupHTML({ description, name })
            this._popup.setLngLat(lngLat).setOffset(4).addTo(map)
        }
    }

    addMarkerPopup(feature: Feature): void {
        if (feature?.properties) {
            const { map } = this._mapboxService
            /* prettier-ignore */
            const { geometry, properties: { description, lat, lng, name } } = feature
            lat && lng
                ? this._popup.setLngLat([lng, lat])
                : this._popup.setLngLat(<LngLatLike>(<Point>geometry).coordinates)
            this.setPopupHTML({ description, name })
            this._popup.setOffset(14).addTo(map)
        }
    }

    removePopup(): void {
        this._popup.remove()
    }

    private setPopupHTML({ description, name }: Record<string, string>): void {
        this._popup.setHTML(
            `<div class="bold">${name}</div>
       <div>${description}</div>`
        )
    }
}
