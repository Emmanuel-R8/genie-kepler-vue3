import { Container, Service } from 'typedi'
import { Router } from 'vue-router'

import { Routes } from '@/enums'
import { ILayer, IStore } from '@/interfaces'
import { MapService, MarkerService } from '@/services'
import { router } from '@/router'
import { store } from '@/store'

@Service()
export default class LayerElementsService {
  constructor(
    private _mapService: MapService,
    private _markerService: MarkerService,
    private _router: Router,
    private _routes: Record<string, string>,
    private _store: IStore
  ) {
    this._mapService = Container.get(MapService)
    this._markerService = Container.get(MarkerService)
    this._router = router
    this._routes = Routes
    this._store = store
  }

  displayLayerElements(layer: ILayer): void {
    switch (layer) {
      case 'satellite':
        /* hide visible markers when changing map styles for aesthetic purposes */
        this.showMarkers()
        /* toggle between 'outdoors' and 'satellite' map styles (basemaps) */
        this.setLayerElementsState(layer)
        this.setMapStylesState()
        this.setMapStyle()
        /* show hidden markers when changing map styles for aesthetic purposes */
        this.showMarkers(1200)
        break
      case 'biosphere':
      case 'trails':
        this.setLayerElementsState(layer)
        this.setStyleLayersVisibilityState(layer)
        this.setStyleLayerVisibility(layer)
        layer === 'biosphere' && this._mapService.setStyleLayerVisibility('biosphere-border')
        layer === 'trails' && this._markerService.toggleMarkers(layer)
        break
      case 'office':
      case 'places':
        this.setLayerElementsState(layer)
        this.toggleMarkers(layer)
        break
      case 'deckgl':
        this.setRoute(this._routes.DECKGL)
        break
    }
  }

  private setLayerElementsState(layer: ILayer): void {
    this._store.setters.setLayerElementsState(layer)
  }

  private setMapStyle(): void {
    this._mapService.setMapStyle()
  }

  private setMapStylesState(): void {
    this._store.setters.setMapStylesState()
  }

  private setRoute(name: string): void {
    this._router.push({ name })
  }

  private setStyleLayerVisibility(layer: ILayer): void {
    this._mapService.setStyleLayerVisibility(layer as string)
  }

  private setStyleLayersVisibilityState(layer: ILayer): void {
    this._store.setters.setStyleLayersVisibilityState(layer)
  }

  private showMarkers(timeout?: number): void {
    timeout
      ? setTimeout((): void => this._markerService.showMarkers(), timeout)
      : this._markerService.showMarkers()
  }

  private toggleMarkers(layer: ILayer): void {
    this._markerService.toggleMarkers(layer)
  }
}
