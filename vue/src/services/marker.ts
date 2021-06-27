import { Feature, Point } from 'geojson'
import { LngLatLike, Marker } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { IHTMLMarkerElement } from '@/interfaces'
import { MapboxService, PopupService } from '@/services'

@Service()
export default class MarkerService {
  private _markers: Marker[][] = []
  private _markersHashmap: Map<string, number> = new Map()

  constructor(private _mapboxService: MapboxService, private _popupService: PopupService) {
    this._mapboxService = Container.get(MapboxService)
    this._popupService = Container.get(PopupService)
  }

  setMarker(id: string, features: Feature[]): void {
    const marker: Marker[] = this.createMarkers(id, features)
    this._markers = [...this._markers, marker]
    this.setMarkersHashmap(id)
  }

  setMarkerVisibility(): void {
    for (const markers of this._markers) {
      for (const marker of markers) {
        const el = <IHTMLMarkerElement>marker.getElement()
        if (!el.isActive && !el.isHidden) {
          break
        }

        el.isActive = !el.isActive
        el.isActive && marker.addTo(this._mapboxService.map)
        el.isHidden = !el.isHidden
        el.isHidden && marker.remove()
      }
    }
  }

  toggleMarkerVisibility(id: string): void {
    for (const marker of this._markers[<number>this._markersHashmap.get(id)]) {
      const el = <IHTMLMarkerElement>marker.getElement()
      el.isActive = !el.isActive
      el.isActive ? marker.addTo(this._mapboxService.map) : marker.remove()
    }
  }

  private createMarkers(id: string, features: Feature[]): Marker[] {
    return features.map((feature: Feature): Marker => this.createMarker(id, feature))
  }

  private createMarker(id: string, feature: Feature): Marker {
    /* prettier-ignore */
    const { geometry, properties: { lng, lat } } = <Record<string, any>>feature
    const el = this.createHTMLMarkerElement(id, feature)
    let marker: Marker
    lat && lng
      ? (marker = new Marker(el).setLngLat([lng, lat]))
      : (marker = new Marker(el).setLngLat(<LngLatLike>(<Point>geometry).coordinates))
    return marker
  }

  private createHTMLMarkerElement(id: string, feature: Feature): IHTMLMarkerElement {
    const el = <IHTMLMarkerElement>document.createElement('div')
    el.className = `${id}-marker`
    el.isActive = false
    el.isHidden = false
    el.addEventListener('mouseenter', (): void => {
      this.addMarkerPopup(feature)
    })
    el.addEventListener('mouseleave', (): void => {
      this.removeMarkerPopup()
    })
    return el
  }

  private addMarkerPopup(feature: Feature): void {
    this._popupService.addMarkerPopup(feature)
  }

  private removeMarkerPopup(): void {
    this._popupService.removePopup()
  }

  private setMarkersHashmap(id: string) {
    this._markersHashmap.set(id, this._markers.length - 1)
  }
}
