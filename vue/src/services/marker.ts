import { Feature, Point } from 'geojson'
import { LngLatLike, Marker } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { LayerElements } from '@/enums'
import { IHTMLMarkerElement, ILayerElement } from '@/interfaces'
import { MapboxService, PopupService } from '@/services'

@Service()
export default class MarkerService {
  private _layerElements = LayerElements
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

  setMarkers(id: string, features: Feature[]): void {
    const markers: Marker[] = features.map(
      (feature: Feature): Marker => this.createMarker(id, feature)
    )
    this._markers = [...this._markers, markers]
    this._markersHash[id] = this._markers.length - 1
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

  toggleMarkers(layerElement: ILayerElement): void {
    for (const marker of this._markers[this._markersHash[layerElement as keyof ILayerElement]]) {
      const el: IHTMLMarkerElement = <IHTMLMarkerElement>marker.getElement()
      el.isActive = !el.isActive
      el.isActive ? marker.addTo(this._mapboxService.map) : marker.remove()
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
      const { properties: { lng, lat } } = feature as any
      return new Marker(el).setLngLat({ lng, lat })
    }
    const markers: Record<string, any> = new Map([
      [OFFICE, marker],
      [PLACES, marker],
      [TRAILS, layerMarker]
    ])
    return markers.get(id)(feature)
  }
  /* create individual html marker elements & add mouse event handlers */
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
