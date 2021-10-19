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

  setMarkers(id: string, features: Feature[]): void {
    const markers: Marker[] = this.createMarkers(id, features)
    this._markers.push(markers)
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
        el.isActive && this.addMarker(marker)
        el.isHidden = !el.isHidden
        el.isHidden && this.removeMarker(marker)
      }
    }
  }

  toggleMarkerVisibility(id: string): void {
    for (const marker of this._markers[<number>this._markersHashmap.get(id)]) {
      const el = <IHTMLMarkerElement>marker.getElement()
      el.isActive = !el.isActive
      el.isActive ? this.addMarker(marker) : this.removeMarker(marker)
    }
  }

  private createMarkers(id: string, features: Feature[]): Marker[] {
    const markers = features.map((feature): Marker => {
      const el = this.setHTMLMarkerElement(id, feature)
      const marker = this.createMarker(el, feature)
      return marker
    })
    return markers
  }

  private setHTMLMarkerElement(id: string, feature: Feature): IHTMLMarkerElement {
    const el = this.createHTMLMarkerElement()
    el.className = id
    el.isActive = false
    el.isHidden = false
    el.addEventListener('mouseenter', (): void => this.addMarkerPopup(feature))
    el.addEventListener('mouseleave', (): void => this.removeMarkerPopup())
    return el
  }

  private createHTMLMarkerElement(): IHTMLMarkerElement {
    return <IHTMLMarkerElement>document.createElement('div')
  }

  private createMarker(el: IHTMLMarkerElement, feature: Feature): Marker {
    const { geometry, properties } = feature
    const { lat, lng } = <Record<string, number>>properties
    if (lat && lng) return new Marker(el).setLngLat([lng, lat])
    return new Marker(el).setLngLat(<LngLatLike>(<Point>geometry).coordinates)
  }

  private addMarker(marker: Marker): void {
    const { map } = this._mapboxService
    marker.addTo(map)
  }

  private addMarkerPopup(feature: Feature): void {
    this._popupService.addMarkerPopup(feature)
  }

  private removeMarker(marker: Marker): void {
    marker.remove()
  }

  private removeMarkerPopup(): void {
    this._popupService.removePopup()
  }

  private setMarkersHashmap(id: string) {
    this._markersHashmap.set(id, this._markers.length - 1)
  }
}
