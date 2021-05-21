import { Container, Service } from 'typedi'
import { Router } from 'vue-router'

import { LayerElements } from '@/enums'
import { ILayerElement } from '@/interfaces'
import { MapService, MarkerService, StoreService } from '@/services'
import { router } from '@/router'

@Service()
export default class LayerElementService {
  private _layerElements: Record<string, string> = LayerElements
  private _router: Router = router

  constructor(
    private _mapService: MapService,
    private _markerService: MarkerService,
    private _storeService: StoreService
  ) {
    this._mapService = Container.get(MapService)
    this._markerService = Container.get(MarkerService)
    this._storeService = Container.get(StoreService)
  }

  displayLayerElements(layerElement: ILayerElement): void {
    const { BIOSPHERE, BIOSPHERE_BORDER, DECKGL, OFFICE, PLACES, SATELLITE, TRAILS } =
      this._layerElements
    const layers = (): void => {
      this.setLayerElementsState(layerElement)
      this.setStyleLayersVisibilityState(layerElement)
      this.setStyleLayerVisibility(layerElement)
      layerElement === BIOSPHERE && this._mapService.setStyleLayerVisibility(BIOSPHERE_BORDER)
      layerElement === TRAILS && this._markerService.toggleMarkers(layerElement)
    }
    const markers = (): void => {
      this.setLayerElementsState(layerElement)
      this.toggleMarkers(layerElement)
    }
    const route = (): void => {
      this.setRoute(DECKGL)
    }
    const satellite = (): void => {
      /* hide visible markers when changing map styles for aesthetic purposes */
      this.showMarkers()
      /* toggle between 'outdoors' and 'satellite' map styles (basemaps) */
      this.setLayerElementsState(layerElement)
      this.setMapStylesState()
      this.setMapStyle()
      /* show hidden markers when changing map styles for aesthetic purposes */
      this.showMarkers(1200)
    }
    const layerElements: Record<string, any> = {
      [BIOSPHERE]: layers,
      [DECKGL]: route,
      [OFFICE]: markers,
      [PLACES]: markers,
      [SATELLITE]: satellite,
      [TRAILS]: layers
    }
    return layerElements[layerElement as keyof ILayerElement]()
  }

  private setLayerElementsState(layerElement: ILayerElement): void {
    this._storeService.setLayerElementsState(layerElement)
  }

  private setMapStyle(): void {
    this._mapService.setMapStyle()
  }

  private setMapStylesState(): void {
    this._storeService.setMapStylesState()
  }

  private setRoute(name: string): void {
    this._router.push({ name })
  }

  private setStyleLayerVisibility(layerElement: ILayerElement): void {
    this._mapService.setStyleLayerVisibility(layerElement as string)
  }

  private setStyleLayersVisibilityState(layerElement: ILayerElement): void {
    this._storeService.setStyleLayersVisibilityState(layerElement)
  }

  private showMarkers(timeout?: number): void {
    timeout
      ? setTimeout((): void => this._markerService.showMarkers(), timeout)
      : this._markerService.showMarkers()
  }

  private toggleMarkers(layerElement: ILayerElement): void {
    this._markerService.toggleMarkers(layerElement)
  }
}
