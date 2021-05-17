import { Feature, FeatureCollection, Point } from 'geojson'
import { LngLatLike, Marker } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { IHTMLMarkerElement, ILayer } from '@/interfaces'
import { MapboxService, PopupService } from '@/services'

@Service()
export default class MarkerService {
  private _markers: Marker[][] = []
  private _markersHash: Record<string, number> = {
    office: 0,
    places: 0,
    trails: 0
  }

  constructor(private _mapboxService: MapboxService, private _popupService: PopupService) {
    this._mapboxService = Container.get(MapboxService)
    this._popupService = Container.get(PopupService)
  }
  /* create individual html marker elements & add mouse event handlers */
  setMarkers(fc: FeatureCollection, id: string): void {
    const markers: Marker[] = []
    fc.features.forEach((feature: Feature): any => {
      if (feature?.properties) {
        const el: IHTMLMarkerElement = <IHTMLMarkerElement>document.createElement('div')
        el.className = `${id}-marker`
        el.hidden = false
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
        const el: IHTMLMarkerElement = <IHTMLMarkerElement>marker.getElement()
        if (!el.hidden && !el.visible) {
          break
        }

        el.hidden = !el.hidden
        el.hidden && marker.remove()
        el.visible = !el.visible
        el.visible && marker.addTo(this._mapboxService.map)
      }
    }
  }

  toggleMarkers(id: ILayer): void {
    for (const marker of this._markers[this._markersHash[id as string]]) {
      const el: IHTMLMarkerElement = <IHTMLMarkerElement>marker.getElement()
      el.visible = !el.visible
      el.visible ? marker.addTo(this._mapboxService.map) : marker.remove()
    }
  }
}
