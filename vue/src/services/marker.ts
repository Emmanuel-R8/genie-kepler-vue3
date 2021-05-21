import { Feature, FeatureCollection, Point } from 'geojson'
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

        const { OFFICE, PLACES, TRAILS } = this._layerElements
        if (id === OFFICE || id === PLACES) {
          const { geometry } = feature
          return markers.push(
            new Marker(el).setLngLat((geometry as Point).coordinates as LngLatLike)
          )
        } else if (id === TRAILS) {
          /* prettier-ignore */
          const { properties: { lat, lng } } = feature
          return markers.push(new Marker(el).setLngLat({ lat, lng }))
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

  toggleMarkers(id: ILayerElement): void {
    for (const marker of this._markers[this._markersHash[id as keyof ILayerElement]]) {
      const el: IHTMLMarkerElement = <IHTMLMarkerElement>marker.getElement()
      el.visible = !el.visible
      el.visible ? marker.addTo(this._mapboxService.map) : marker.remove()
    }
  }
}
