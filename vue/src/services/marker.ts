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
        const { map } = this._mapboxService
        const el = <IHTMLMarkerElement>marker.getElement()
        if (!el.isActive && !el.isHidden) {
          break
        }
        el.isActive = !el.isActive
        el.isActive && marker.addTo(map)
        el.isHidden = !el.isHidden
        el.isHidden && marker.remove()
      }
    }
  }

  toggleMarkerVisibility(id: string): void {
    for (const marker of this._markers[<number>this._markersHashmap.get(id)]) {
      const { map } = this._mapboxService
      const el = <IHTMLMarkerElement>marker.getElement()
      el.isActive = !el.isActive
      el.isActive ? marker.addTo(map) : marker.remove()
    }
  }

  private createMarkers(id: string, features: Feature[]): Marker[] {
    const markers = features.map((feature: Feature): Marker => {
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
    el.addEventListener('mouseleave', (): void => this.removePopup())
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

  private addMarkerPopup(feature: Feature): void {
    this._popupService.addMarkerPopup(feature)
  }

  private removePopup(): void {
    this._popupService.removePopup()
  }

  private setMarkersHashmap(id: string) {
    this._markersHashmap.set(id, this._markers.length - 1)
  }
}
