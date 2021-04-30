import { Feature, FeatureCollection, Point } from 'geojson'
import { LngLatLike, Marker } from 'mapbox-gl'
import { Container, Service } from 'typedi'

// import { StoreActions } from '@/enums'
import { HTMLMarkerElement } from '@/interfaces'
import { MapService, PopupService } from '@/services'
// import store from '@/store'

@Service()
export default class MarkerService {
  constructor(
    private _markers: any[],
    private _markersHash: Record<string, number>,
    private _mapService: MapService,
    private _popupService: PopupService
  ) {
    this._markers = []
    this._markersHash = {
      office: 0,
      places: 0,
      trails: 0
    }
    this._mapService = Container.get(MapService)
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
          marker.addTo(this._mapService.map)
        }
      }
    }
  }

  toggleMarkers(id: string): void {
    // store.dispatch(`markers/${StoreActions.SET_MARKERS_VISIBILITY}`, id)
    for (const marker of this._markers[this._markersHash[id]]) {
      const el: HTMLMarkerElement = <HTMLMarkerElement>marker.getElement()
      el.visible = !el.visible
      el.visible ? marker.addTo(this._mapService.map) : marker.remove()
    }
  }
}
