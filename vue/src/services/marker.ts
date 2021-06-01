import { Feature, Point } from 'geojson'
import { LngLatLike, Marker } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { LayerElements } from '@/enums'
import { IHTMLMarkerElement, ILayerElement } from '@/interfaces'
import { MapboxService, PopupService } from '@/services'

@Service()
export default class MarkerService {
  private _layerElements = LayerElements
  private _marker: Marker[] = []
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
    this._marker = []
    for (const feature of features) {
      this._marker = this.createMarker(id, feature)
    }
    this._markers.push(this._marker)
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

  toggleMarkers(layerElement: ILayerElement): void {
    for (const marker of this._markers[this._markersHash[layerElement as keyof ILayerElement]]) {
      const el: IHTMLMarkerElement = <IHTMLMarkerElement>marker.getElement()
      el.visible = !el.visible
      el.visible ? marker.addTo(this._mapboxService.map) : marker.remove()
    }
  }
  /* create individual html marker elements & add mouse event handlers */
  private createHTMLMarkerElement(id: string, feature: Feature): IHTMLMarkerElement {
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
    return el
  }

  private createMarker(id: string, feature: Feature): Marker[] {
    const { OFFICE, PLACES, TRAILS } = this._layerElements
    const el: IHTMLMarkerElement = this.createHTMLMarkerElement(id, feature)

    const marker = (feature: Feature): Marker[] => {
      const { geometry } = feature
      this._marker.push(new Marker(el).setLngLat((geometry as Point).coordinates as LngLatLike))
      return this._marker
    }
    const layerMarker = (feature: Feature): Marker[] => {
      /* prettier-ignore */
      const { properties: { lng, lat } } = feature as any
      this._marker.push(new Marker(el).setLngLat({ lng, lat }))
      return this._marker
    }
    const markers: Record<string, any> = new Map([
      [OFFICE, marker],
      [PLACES, marker],
      [TRAILS, layerMarker]
    ])

    return markers.get(id)(feature)
  }
}
