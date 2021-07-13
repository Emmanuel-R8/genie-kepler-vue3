import { Container, Service } from 'typedi'

import {
  DeckService,
  HexagonLayerService,
  LayerElementService,
  MapService,
  MapboxService,
  RouterService,
  TrailService
} from '@/services'

@Service()
export default class EventService {
  constructor(
    private _deckService: DeckService,
    private _hexagonLayerService: HexagonLayerService,
    private _layerElementService: LayerElementService,
    private _mapService: MapService,
    private _mapboxService: MapboxService,
    private _routerService: RouterService,
    private _trailService: TrailService
  ) {
    this._deckService = Container.get(DeckService)
    this._hexagonLayerService = Container.get(HexagonLayerService)
    this._layerElementService = Container.get(LayerElementService)
    this._mapService = Container.get(MapService)
    this._mapboxService = Container.get(MapboxService)
    this._routerService = Container.get(RouterService)
    this._trailService = Container.get(TrailService)
  }

  removeDeckglEventListeners(): void {
    this._deckService.map.off('load', this._deckService.onMapLoadHandler)
    this._deckService.map.off('load', this._hexagonLayerService.onMapLoadHandler)
  }

  removeMapboxEventListeners(): void {
    this._mapboxService.map.off('click', this._mapService.onMapClickHandler)
    this._mapboxService.map.off('load', this._mapService.onMapLoadHandler)
    this._mapboxService.map.off('mouseenter', this._mapService.onMapMouseEnterHandler)
    this._mapboxService.map.off('mouseleave', this._mapService.onMapMouseLeaveHandler)
    this._mapboxService.map.off('idle', this._mapboxService.onMapIdleHandler)
    this._mapboxService.map.off('load', this._mapboxService.onMapLoadHandler)
  }

  setDisplayLayerElementEventListener(eventListener: boolean): void {
    for (const el of document.getElementsByClassName('layer-element')) {
      eventListener
        ? el.addEventListener('click', (evt): void => {
            this.onDisplayLayerElementClickHandler(evt)
          })
        : el.removeEventListener('click', (evt): void => {
            this.onDisplayLayerElementClickHandler(evt)
          })
    }
  }

  setHexagonLayerEventListeners(eventListener: boolean): void {
    for (const el of document.getElementsByClassName('props')) {
      eventListener
        ? el.addEventListener('change', (evt): void => {
            this.onSetHexagonLayerPropsChangeHandler(evt)
          })
        : el.removeEventListener('change', (evt): void => {
            this.onSetHexagonLayerPropsChangeHandler(evt)
          })
    }
    for (const el of document.getElementsByClassName('reset')) {
      eventListener
        ? el.addEventListener('click', (evt): void => {
            this.onResetHexagonLayerPropsClickHandler(evt)
          })
        : el.removeEventListener('click', (evt): void => {
            this.onResetHexagonLayerPropsClickHandler(evt)
          })
    }
    for (const el of document.getElementsByClassName('mapbox')) {
      eventListener
        ? el.addEventListener('click', (evt): void => {
            this.onReturnToTrailsClickHandler(evt)
          })
        : el.removeEventListener('click', (evt): void => {
            this.onReturnToTrailsClickHandler(evt)
          })
    }
  }

  setSelectTrailChangeEventListener(eventListener: boolean): void {
    for (const el of document.getElementsByClassName('trails')) {
      eventListener
        ? el.addEventListener('change', (evt): void => {
            this.onSelectTrailChangeHandler(evt)
          })
        : el.removeEventListener('change', (evt): void => {
            this.onSelectTrailChangeHandler(evt)
          })
    }
  }

  private onDisplayLayerElementClickHandler = (evt: Event): void => {
    evt.stopPropagation()
    /* prettier-ignore */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const { target: { id } }: Record<string, any> = evt
    id && this._layerElementService.displayLayerElement(id)
  }

  private onSelectTrailChangeHandler = (evt: Event): void => {
    evt.stopPropagation()
    /* prettier-ignore */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const { target: { value: trailName } }: Record<string, any> = evt
    trailName && this._trailService.selectTrail(trailName)
  }

  private onSetHexagonLayerPropsChangeHandler = (evt: Event): void => {
    evt.stopPropagation()
    /* prettier-ignore */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const { target: { id: prop, value } }: Record<string, any> = evt
    prop && value && this._hexagonLayerService.setHexagonLayerPropsState(prop, value)
  }

  private onResetHexagonLayerPropsClickHandler = (evt: Event): void => {
    evt.stopPropagation()
    this._hexagonLayerService.resetHexagonLayerPropsState()
  }

  private onReturnToTrailsClickHandler = (evt: Event): void => {
    evt.stopPropagation()
    /* prettier-ignore */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const { target: { className: id } }: Record<string, any> = evt
    id && this._routerService.setRoute(id)
  }
}
