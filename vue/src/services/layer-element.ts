import { Container, Service } from 'typedi'
import { Router } from 'vue-router'

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
  private _LAYER_ELEMENTS: string = States.LAYER_ELEMENTS
  private _MAP_STYLES: string = States.MAP_STYLES
  private _STYLE_LAYERS: string = States.STYLE_LAYERS
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

  get state(): ILayerElement[] {
    return this._storeService.getState(this._LAYER_ELEMENTS)
  }
  private set _state(layerElement: LayerElement) {
    this._storeService.setState(this._LAYER_ELEMENTS, { layerElement })
  }

  displayLayerElement(layerElement: LayerElement): void {
    const { BIOSPHERE, DECKGL, OFFICE, PLACES, SATELLITE, TRAILS } = this._layerElements
    const layerElements: Record<string, any> = new Map([
      [BIOSPHERE, this.layer],
      [DECKGL, this.route],
      [OFFICE, this.marker],
      [PLACES, this.marker],
      [SATELLITE, this.satellite],
      [TRAILS, this.layer]
    ])
    layerElements.get(layerElement)(layerElement)
  }

  private layer = (layerElement: LayerElement): void => {
    const { BIOSPHERE, BIOSPHERE_BORDER, TRAILS } = this._layerElements
    this._state = layerElement
    this.setStyleLayersState(layerElement)
    this.setStyleLayerVisibility(layerElement)
    layerElement === BIOSPHERE && this.setStyleLayerVisibility(BIOSPHERE_BORDER as LayerElement)
    layerElement === TRAILS && this.toggleMarkers(layerElement)
  }

  private marker = (layerElement: LayerElement): void => {
    this._state = layerElement
    this.toggleMarkers(layerElement)
  }
  private route = (): void => {
    const { DECKGL } = this._layerElements
    this.setRoute(DECKGL)
  }
  private satellite = (layerElement: LayerElement): void => {
    /* hide active markers when changing map styles for aesthetic purposes */
    this.showMarkers()
    /* toggle between 'outdoors' and 'satellite' map styles (basemaps) */
    this._state = layerElement
    this.setMapStylesState()
    this.setMapStyle()
    /* show hidden markers when changing map styles for aesthetic purposes */
    this.showMarkers(1000)
  }

  private setMapStyle(): void {
    this._mapService.setMapStyle()
  }

  private setMapStylesState(): void {
    this._storeService.setState(this._MAP_STYLES)
  }

  private setRoute(name: string): void {
    this._router.push({ name })
  }

  private setStyleLayerVisibility(layerElement: LayerElement): void {
    this._mapService.setStyleLayerVisibility(layerElement)
  }

  private setStyleLayersState(layerElement: LayerElement): void {
    this._storeService.setState(this._STYLE_LAYERS, { layerElement })
  }

  private showMarkers(timeout?: number): void {
    timeout
      ? setTimeout((): void => this._markerService.showMarkers(), timeout)
      : this._markerService.showMarkers()
  }

  private toggleMarkers(layerElement: LayerElement): void {
    this._markerService.toggleMarkers(layerElement)
  }
}
