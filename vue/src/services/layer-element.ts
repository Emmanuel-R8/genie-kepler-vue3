import { Container, Service } from 'typedi'

import { LayerElements, States } from '@/enums'
import { ILayerElement } from '@/interfaces'
import {
  LayerVisibilityService,
  MapService,
  MapStyleService,
  MarkerService,
  RouterService,
  StateService
} from '@/services'
import { LayerElement } from '@/types'

@Service()
export default class LayerElementService {
  private _layerElements: Record<string, string> = LayerElements
  private _states: Record<string, string> = States

  constructor(
    private _layerVisibilityService: LayerVisibilityService,
    private _mapService: MapService,
    private _mapStyleService: MapStyleService,
    private _markerService: MarkerService,
    private _routerService: RouterService,
    private _stateService: StateService
  ) {
    this._layerVisibilityService = Container.get(LayerVisibilityService)
    this._mapService = Container.get(MapService)
    this._mapStyleService = Container.get(MapStyleService)
    this._markerService = Container.get(MarkerService)
    this._routerService = Container.get(RouterService)
    this._stateService = Container.get(StateService)
  }

  get state(): ILayerElement[] {
    const { LAYER_ELEMENTS } = this._states
    return <ILayerElement[]>this._stateService.getReactiveState(LAYER_ELEMENTS)
  }

  private set _state(layerElements: ILayerElement[]) {
    const { LAYER_ELEMENTS } = this._states
    this._stateService.setReactiveState(LAYER_ELEMENTS, layerElements)
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
    layerElements[id] && layerElements[id](id)
  }

  private layer = (id: LayerElement): void => {
    const { BIOSPHERE, BIOSPHERE_BORDER, TRAILS } = this._layerElements
    this.setLayerElementState(id)
    this.setLayerVisibilityState(id)
    this.setLayerVisibility(id)
    id === BIOSPHERE && this.setLayerVisibility(<LayerElement>BIOSPHERE_BORDER)
    id === TRAILS && this.toggleMarkerVisibility(id)
  }

  private marker = (id: LayerElement): void => {
    this.setLayerElementState(id)
    this.toggleMarkerVisibility(id)
  }

  private route = async (id: LayerElement): Promise<void> => {
    await this.setRoute(id)
  }

  private satellite = (id: LayerElement): void => {
    this.setLayerElementState(id)
    this.setMarkerVisibility()
    this.setMapStyleState()
    this.setMapStyle()
  }

  private setLayerElementState(id: LayerElement): void {
    const state = this.state
    const layerElement = (layerElement: ILayerElement): boolean => layerElement.id === id
    const i = state.findIndex(layerElement)
    if (i >= 0) {
      state[i].isActive = !state[i].isActive
      this._state = state
    }
  }

  private setLayerVisibilityState(id: LayerElement): void {
    this._layerVisibilityService.setLayerVisibilityState(id)
  }

  private setLayerVisibility(id: LayerElement): void {
    this._mapService.setLayerVisibility(id)
  }

  private setMapStyle(): void {
    this._mapStyleService.setMapStyle()
    this._mapService.setMapStyle()
  }

  private setMapStyleState(): void {
    this._mapStyleService.setMapStyleState()
  }

  private async setRoute(id: LayerElement): Promise<void> {
    await this._routerService.setRoute(id)
  }

  private setMarkerVisibility(): void {
    this._markerService.setMarkerVisibility()
  }

  private toggleMarkerVisibility(id: LayerElement): void {
    this._markerService.toggleMarkerVisibility(id)
  }
}
