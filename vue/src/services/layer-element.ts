import { Container, Service } from 'typedi'

import { LayerElements, States } from '@/enums'
import { ILayerElement } from '@/interfaces'
import { MapService, MarkerService, StoreService } from '@/services'
import { router } from '@/router'

type LayerElement =
  | 'biosphere'
  | 'biosphere-border'
  | 'deckgl'
  | 'office'
  | 'places'
  | 'satellite'
  | 'trails'

@Service()
export default class LayerElementService {
  private _layerElements: Record<string, string> = LayerElements
  private _router = router
  private _states: Record<string, string> = States

  constructor(
    private _mapService: MapService,
    private _markerService: MarkerService,
    private _storeService: StoreService
  ) {
    this._mapService = Container.get(MapService)
    this._markerService = Container.get(MarkerService)
    this._storeService = Container.get(StoreService)
  }

  get state(): ILayerElement[] {
    const { LAYER_ELEMENTS } = this._states
    return <ILayerElement[]>this._storeService.getState(LAYER_ELEMENTS)
  }

  private set _state(id: LayerElement) {
    const { LAYER_ELEMENTS } = this._states
    this._storeService.setState(LAYER_ELEMENTS, { id })
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

  private setLayerElementsState = (id: LayerElement): void => {
    this._state = id
  }

  private setMapStyle(): void {
    this._mapService.setMapStyle()
  }

  private setMapStylesState(): void {
    const { MAP_STYLES } = this._states
    this._storeService.setState(MAP_STYLES)
  }

  private async setRoute(name: string): Promise<void> {
    await this._router.push({ name })
  }

  private setStyleLayerVisibility(id: LayerElement): void {
    this._mapService.setStyleLayerVisibility(id)
  }

  private setStyleLayersState(id: LayerElement): void {
    const { STYLE_LAYERS } = this._states
    this._storeService.setState(STYLE_LAYERS, { id })
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
