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
    return this._storeService.getState(LAYER_ELEMENTS) as ILayerElement[]
  }
  private set _state(layerElement: LayerElement) {
    const { LAYER_ELEMENTS } = this._states
    this._storeService.setState(LAYER_ELEMENTS, { layerElement })
  }

  displayLayerElement(layerElement: LayerElement): void {
    const { BIOSPHERE, DECKGL, OFFICE, PLACES, SATELLITE, TRAILS } = this._layerElements
    const layerElementsMap = new Map([
      [BIOSPHERE, this.layer],
      [DECKGL, this.route],
      [OFFICE, this.marker],
      [PLACES, this.marker],
      [SATELLITE, this.satellite],
      [TRAILS, this.layer]
    ])
    return layerElementsMap.get(layerElement)(layerElement)
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
  private route = async (): Promise<void> => {
    const { DECKGL } = this._layerElements
    await this.setRoute(DECKGL)
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
    const { MAP_STYLES } = this._states
    this._storeService.setState(MAP_STYLES)
  }

  private async setRoute(name: string): Promise<void> {
    await this._router.push({ name })
  }

  private setStyleLayerVisibility(layerElement: LayerElement): void {
    this._mapService.setStyleLayerVisibility(layerElement)
  }

  private setStyleLayersState(layerElement: LayerElement): void {
    const { STYLE_LAYERS } = this._states
    this._storeService.setState(STYLE_LAYERS, { layerElement })
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
