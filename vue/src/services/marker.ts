import { Feature, FeatureCollection, Point } from 'geojson'
import { LngLatLike, Marker } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { HTMLMarkerElement } from '@/interfaces'
import { MapboxService, PopupService } from '@/services'

@Service()
export default class MarkerService {
  constructor(
    private _mapboxService: MapboxService,
    private _popupService: PopupService,
    private _markers: any[],
    private _markersHash: Record<string, number>
  ) {
    this._mapboxService = Container.get(MapboxService)
    this._popupService = Container.get(PopupService)
    this._markers = []
    this._markersHash = {
      office: 0,
      places: 0,
      trails: 0
    }
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
          case 'places': {
            /* prettier-ignore */
            const { geometry } = feature
            return markers.push(
              new Marker(el).setLngLat((geometry as Point).coordinates as LngLatLike)
            )
          }
          case 'trails': {
            /* prettier-ignore */
            const { properties: { lat, lng } } = feature
            return markers.push(new Marker(el).setLngLat({ lat, lng }))
          }
          default:
            throw new Error('Marker ID error')
        }
      }
    })

    this._markers.push(markers)
    this._markersHash[id] = this._markers.length - 1
  }

  showMarkers(): void {
    for (const markers of this._markers) {
      for (const marker of markers) {
        const el: HTMLMarkerElement = <HTMLMarkerElement>marker.getElement()

        if (!el.hidden && !el.visible) {
          return
        }

        el.hidden = !el.hidden
        el.visible = !el.visible

        if (el.hidden) {
          marker.remove()
        }
        if (el.visible) {
          marker.addTo(this._mapboxService.map)
        }
      }
    }
  }

  toggleMarkers(id: string): void {
    for (const marker of this._markers[this._markersHash[id]]) {
      const el: HTMLMarkerElement = <HTMLMarkerElement>marker.getElement()
      el.visible = !el.visible
      el.visible ? marker.addTo(this._mapboxService.map) : marker.remove()
    }
  }
}
