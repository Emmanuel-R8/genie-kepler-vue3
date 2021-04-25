import { Feature, FeatureCollection, Point } from 'geojson'
import { LngLatLike, Marker } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { StoreActions } from '@/enums'
import { HTMLMarkerElement } from '@/interfaces'
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
  /* create individual html marker elements & add mouse event handlers */
  setMarkers(fc: FeatureCollection, id: string): void {
    const markers: Marker[] = []

    fc.features.forEach((feature: Feature): any => {
      if (feature?.properties) {
        const el: HTMLMarkerElement = <HTMLMarkerElement>document.createElement('div')
        el.className = `${id}-marker`
        el.visible = false
        el.addEventListener('mouseenter', (): void => {
          this._popupService.addMarkerPopup(id, feature)
        })
        el.addEventListener('mouseleave', (): void => {
          this._popupService.removePopup()
        })

        switch (id) {
          case 'office':
          case 'places':
            return markers.push(
              new Marker(el).setLngLat((feature.geometry as Point).coordinates as LngLatLike)
            )
          case 'trails':
            return markers.push(
              new Marker(el).setLngLat([
                feature.properties.lng,
                feature.properties.lat
              ] as LngLatLike)
            )
          default:
            throw new Error('Marker ID error')
        }
      }
    })

    this._markers.push(markers)
    this._markersHash[id] = this._markers.length - 1
  }

  showMarkers(): void {
    this._markers.forEach((markers: Marker[]): void => {
      markers.forEach((marker: Marker): void => {
        const el: HTMLMarkerElement = <HTMLMarkerElement>marker.getElement()

        if (!el.hidden && !el.visible) {
          return
        }

        el.hidden = !el.hidden
        el.visible = !el.visible

        if (!el.hidden) {
          marker.addTo(this._mapboxService.map)
        }
        if (!el.visible) {
          marker.remove()
        }
      })
    })
  }

  toggleMarkers(id: string): void {
    store.dispatch(`markers/${StoreActions.SET_MARKERS_VISIBILITY}`, id)

    this._markers[this._markersHash[id]].forEach((marker: Marker): void => {
      const el: HTMLMarkerElement = <HTMLMarkerElement>marker.getElement()
      el.visible ? marker.remove() : marker.addTo(this._mapboxService.map)
    })
  }
}
