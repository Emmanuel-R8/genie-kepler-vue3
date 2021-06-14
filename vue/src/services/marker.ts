import { Feature, Point } from 'geojson'
import { LngLatLike, Marker } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { LayerElements } from '@/enums'
import { IHTMLMarkerElement } from '@/interfaces'
import { MapboxService, PopupService } from '@/services'

@Service()
export default class MarkerService {
  private _layerElements: Record<string, string> = LayerElements
  private _markers: Marker[][] = []
  private _markersHashmap: Map<string, number> = new Map()

  constructor(private _mapboxService: MapboxService, private _popupService: PopupService) {
    this._mapboxService = Container.get(MapboxService)
    this._popupService = Container.get(PopupService)
    this.createmarkersHashmap()
  }

  setMarkers(id: string, features: Feature[]): void {
    const markers: Marker[] = features.map(
      (feature: Feature): Marker => this.createMarker(id, feature)
    )
    this._markers = [...this._markers, markers]
    this._markersHashmap.set(id, this._markers.length - 1)
  }

  showMarkers(): void {
    for (const markers of this._markers) {
      for (const marker of markers) {
        const el: IHTMLMarkerElement = <IHTMLMarkerElement>marker.getElement()
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

  toggleMarkers(id: string): void {
    for (const marker of this._markers[this._markersHashmap.get(id)]) {
      const el: IHTMLMarkerElement = <IHTMLMarkerElement>marker.getElement()
      el.isActive = !el.isActive
      el.isActive ? marker.addTo(this._mapboxService.map) : marker.remove()
    }
  }

  private createmarkersHashmap(): void {
    const { OFFICE, PLACES, TRAILS } = this._layerElements
    const markers: string[] = [OFFICE, PLACES, TRAILS]
    for (const marker of markers) {
      this._markersHashmap.set(marker, 0)
    }
  }

  private createMarker(id: string, feature: Feature): Marker {
    const { OFFICE, PLACES, TRAILS } = this._layerElements
    const el: IHTMLMarkerElement = this.createHTMLMarkerElement(id, feature)
    const marker = (feature: Feature): Marker => {
      const { geometry } = feature
      return new Marker(el).setLngLat((geometry as Point).coordinates as LngLatLike)
    }
    const layerMarker = (feature: Feature): Marker => {
      /* prettier-ignore */
      const { properties: { lng, lat } } = feature
      return new Marker(el).setLngLat([lng, lat])
    }
    const markersMap = new Map([
      [OFFICE, marker],
      [PLACES, marker],
      [TRAILS, layerMarker]
    ])
    return markersMap.get(id)(feature)
  }

  private createHTMLMarkerElement(id: string, feature: Feature): IHTMLMarkerElement {
    const el: IHTMLMarkerElement = <IHTMLMarkerElement>document.createElement('div')
    el.className = `${id}-marker`
    el.isActive = false
    el.isHidden = false
    el.addEventListener('mouseenter', (): void => {
      this._popupService.addMarkerPopup(id, feature)
    })
    el.addEventListener('mouseleave', (): void => {
      this._popupService.removePopup()
    })
    return el
  }
}
