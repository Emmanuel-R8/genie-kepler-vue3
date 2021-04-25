import { Feature, FeatureCollection, Point } from 'geojson'
import { LngLatLike, Marker } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { StoreActions } from '@/enums'
import { MapboxService, PopupService } from '@/services'
import store from '@/store'

@Service()
export default class MarkerService {
  constructor(
    private _markers: any[],
    private _markersHash: Record<string, number>,
    private _mapboxService: MapboxService,
    private _popupService: PopupService
  ) {
    this._markers = []
    this._markersHash = {
      office: 0,
      places: 0,
      trails: 0
    }
    this._mapboxService = Container.get(MapboxService)
    this._popupService = Container.get(PopupService)
  }
  /* create individual marker elements and add mouse event handlers */
  setMarkers(fc: FeatureCollection, id: string): void {
    const markers: Marker[] = []

    fc.features.forEach((feature: Feature): void => {
      if (feature?.properties) {
        const el: any = document.createElement('div')
        el.className = `${id}-marker`
        el.active = false
        el.hidden = false
        el.addEventListener('mouseenter', (): void => {
          this._popupService.addMarkerPopup(id, feature)
        })
        el.addEventListener('mouseleave', (): void => {
          this._popupService.removePopup()
        })

        switch (id) {
          case 'office':
          case 'places':
            markers.push(
              new Marker(el).setLngLat((feature.geometry as Point).coordinates as LngLatLike)
            )
            break
          case 'trails':
            markers.push(
              new Marker(el).setLngLat([
                feature.properties.lng,
                feature.properties.lat
              ] as LngLatLike)
            )
            break
        }
      }
    })

    this._markers.push(markers)
    this._markersHash[id] = this._markers.length - 1
  }

  showMarkers(): void {
    this._markers.forEach((markers: Marker[]): void => {
      markers.forEach((marker: Marker): void => {
        const el: any = marker.getElement()

        if (!el.active && !el.hidden) {
          return
        }

        el.active = !el.active
        el.hidden = !el.hidden

        if (!el.active) {
          marker.remove()
        }
        if (!el.hidden) {
          this._mapboxService.addToMap(marker)
        }
        return
      })
    })
  }

  toggleMarkers(id: string): void {
    store.dispatch(`markers/${StoreActions.SET_MARKERS_VISIBILITY}`, id)

    this._markers[this._markersHash[id]].forEach((marker: Marker): void => {
      const el: any = marker.getElement()
      el.active ? marker.remove() : this._mapboxService.addToMap(marker)
    })
  }
}
