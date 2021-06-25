import { Container, Service } from 'typedi'

import { LayerElements, States } from '@/enums'
import { ILayerElement } from '@/interfaces'
import { LayerElement } from '@/types'
import {
  MapService,
  MapStyleService,
  MarkerService,
  RouteService,
  StoreService,
  StyleLayerService
} from '@/services'

@Service()
export default class LayerElementService {
  private _layerElements: Record<string, string> = LayerElements
  private _states: Record<string, string> = States

  constructor(
    private _mapService: MapService,
    private _mapStyleService: MapStyleService,
    private _markerService: MarkerService,
    private _routeService: RouteService,
    private _storeService: StoreService,
    private _styleLayerService: StyleLayerService
  ) {
    this._mapService = Container.get(MapService)
    this._mapStyleService = Container.get(MapStyleService)
    this._markerService = Container.get(MarkerService)
    this._routeService = Container.get(RouteService)
    this._storeService = Container.get(StoreService)
    this._styleLayerService = Container.get(StyleLayerService)
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
    this.setStyleLayersState(id)
    this.setStyleLayerVisibility(id)
    id === BIOSPHERE && this.setStyleLayerVisibility(<LayerElement>BIOSPHERE_BORDER)
    id === TRAILS && this.toggleMarkers(id)
  }

  private marker = (id: LayerElement): void => {
    this.setLayerElementsState(id)
    this.toggleMarkers(id)
  }

  private route = async (): Promise<void> => {
    const { DECKGL } = this._layerElements
    await this.setRoute(DECKGL)
  }

  private satellite = (id: LayerElement): void => {
    /* hide active markers when changing map styles for aesthetic purposes */
    this.showMarkers()
    /* toggle between 'outdoors' and 'satellite' map styles (basemaps) */
    this.setLayerElementsState(id)
    this.setMapStylesState()
    this.setMapStyle()
    /* show hidden markers when changing map styles for aesthetic purposes */
    this.showMarkers(1000)
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

  private setMapStyle(): void {
    this._mapService.setMapStyle()
  }

  private setMapStylesState(): void {
    this._mapStyleService.setMapStylesState()
  }

  private async setRoute(name: string): Promise<void> {
    await this._routeService.setRoute(name)
  }

  private setStyleLayerVisibility(id: LayerElement): void {
    this._mapService.setStyleLayerVisibility(id)
  }

  private setStyleLayersState(id: LayerElement): void {
    this._styleLayerService.setStyleLayersState(id)
  }

  private showMarkers(timeout?: number): void {
    timeout
      ? setTimeout((): void => this._markerService.showMarkers(), timeout)
      : this._markerService.showMarkers()
  }

  private toggleMarkers(id: LayerElement): void {
    this._markerService.toggleMarkers(id)
  }
}
