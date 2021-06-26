import { Container, Service } from 'typedi'

import { LayerElements, Routes, States } from '@/enums'
import { ILayerElement } from '@/interfaces'
import { LayerElement } from '@/types'
import {
  LayerService,
  MapService,
  MapStyleService,
  MarkerService,
  RouteService,
  StoreService
} from '@/services'

@Service()
export default class LayerElementService {
  private _layerElements: Record<string, string> = LayerElements
  private _routes: Record<string, string> = Routes
  private _states: Record<string, string> = States

  constructor(
    private _layerService: LayerService,
    private _mapService: MapService,
    private _mapStyleService: MapStyleService,
    private _markerService: MarkerService,
    private _routeService: RouteService,
    private _storeService: StoreService
  ) {
    this._layerService = Container.get(LayerService)
    this._mapService = Container.get(MapService)
    this._mapStyleService = Container.get(MapStyleService)
    this._markerService = Container.get(MarkerService)
    this._routeService = Container.get(RouteService)
    this._storeService = Container.get(StoreService)
  }

  get state(): ILayerElement[] {
    const { LAYER_ELEMENTS } = this._states
    return <ILayerElement[]>this._storeService.getState(LAYER_ELEMENTS)
  }

  private set _state(layerElements: ILayerElement[]) {
    const { LAYER_ELEMENTS } = this._states
    this._storeService.setState(LAYER_ELEMENTS, layerElements)
  }

  displayLayerElement(id: LayerElement): void {
    const { BIOSPHERE, DECKGL, OFFICE, PLACES, SATELLITE, TRAILS } = this._layerElements
    const layerElements = {
      [BIOSPHERE]: this.layer,
      [DECKGL]: this.route,
      [OFFICE]: this.marker,
      [PLACES]: this.marker,
      [SATELLITE]: this.satellite,
      [TRAILS]: this.layer
    }
    layerElements[id](id)
  }

  private layer = (id: LayerElement): void => {
    const { BIOSPHERE, BIOSPHERE_BORDER, TRAILS } = this._layerElements
    this.setLayerElementsState(id)
    this.setLayerState(id)
    this.setLayerVisibility(id)
    id === BIOSPHERE && this.setLayerVisibility(<LayerElement>BIOSPHERE_BORDER)
    id === TRAILS && this.toggleMarkers(id)
  }

  private marker = (id: LayerElement): void => {
    this.setLayerElementsState(id)
    this.toggleMarkers(id)
  }

  private route = async (): Promise<void> => {
    const { DECKGL } = this._routes
    await this.setRoute(DECKGL)
  }

  private satellite = (id: LayerElement): void => {
    this.setLayerElementsState(id)
    this.setMapStyleState()
    this.setMapStyle()
    this.showMarkers()
  }

  private setLayerElementsState(id: LayerElement): void {
    const layerElements = this.state
    const layerElement = (layerElement: ILayerElement): boolean => layerElement.id === id
    const i = layerElements.findIndex(layerElement)
    if (i >= 0) {
      layerElements[i].isActive = !layerElements[i].isActive
      this._state = layerElements
    }
  }

  private setLayerState(id: LayerElement): void {
    this._layerService.setLayerState(id)
  }

  private setLayerVisibility(id: LayerElement): void {
    this._mapService.setLayerVisibility(id)
  }

  private setMapStyle(): void {
    this._mapService.setMapStyle()
  }

  private setMapStyleState(): void {
    this._mapStyleService.setMapStyleState()
  }

  private async setRoute(name: string): Promise<void> {
    await this._routeService.setRoute(name)
  }

  private showMarkers(): void {
    /* hide active markers when changing map styles */
    this._markerService.showMarkers()
    /* show hidden markers when changing map styles */
    setTimeout((): void => this._markerService.showMarkers(), 1000)
  }

  private toggleMarkers(id: LayerElement): void {
    this._markerService.toggleMarkers(id)
  }
}
