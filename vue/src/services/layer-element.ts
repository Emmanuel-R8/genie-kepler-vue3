import { Container, Service } from 'typedi'
import { Router } from 'vue-router'

import { LayerElements, StoreStates } from '@/enums'
import { ILayerElement, ILayerElements } from '@/interfaces'
import { MapService, MarkerService, StoreService } from '@/services'
import { router } from '@/router'

@Service()
export default class LayerElementService {
  private _LAYER_ELEMENTS: string = StoreStates.LAYER_ELEMENTS
  private _MAP_STYLES: string = StoreStates.MAP_STYLES
  private _STYLE_LAYERS_VISIBILITY: string = StoreStates.STYLE_LAYERS_VISIBILITY
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

  displayLayerElement({ id }: ILayerElements): void {
    const layerElement = id.replace(/-(.*)$/, '') as ILayerElement
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

  private layer = (layerElement: ILayerElement): void => {
    const { BIOSPHERE, BIOSPHERE_BORDER, TRAILS } = this._layerElements
    this.setLayerElementsState(layerElement)
    this.setStyleLayersVisibilityState(layerElement)
    this.setStyleLayerVisibility(layerElement)
    layerElement === BIOSPHERE && this._mapService.setStyleLayerVisibility(BIOSPHERE_BORDER)
    layerElement === TRAILS && this._markerService.toggleMarkers(layerElement)
  }

  private marker = (layerElement: ILayerElement): void => {
    this.setLayerElementsState(layerElement)
    this.toggleMarkers(layerElement)
  }
  private route = (): void => {
    const { DECKGL } = this._layerElements
    this.setRoute(DECKGL)
  }
  private satellite = (layerElement: ILayerElement): void => {
    /* hide active markers when changing map styles for aesthetic purposes */
    this.showMarkers()
    /* toggle between 'outdoors' and 'satellite' map styles (basemaps) */
    this.setLayerElementsState(layerElement)
    this.setMapStylesState()
    this.setMapStyle()
    /* show hidden markers when changing map styles for aesthetic purposes */
    this.showMarkers(1000)
  }

  private setLayerElementsState(layerElement: ILayerElement): void {
    this._storeService.setState(this._LAYER_ELEMENTS, layerElement)
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

  private setStyleLayerVisibility(layerElement: ILayerElement): void {
    this._mapService.setStyleLayerVisibility(layerElement as keyof ILayerElement)
  }

  private setStyleLayersVisibilityState(layerElement: ILayerElement): void {
    this._storeService.setState(this._STYLE_LAYERS_VISIBILITY, layerElement)
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
