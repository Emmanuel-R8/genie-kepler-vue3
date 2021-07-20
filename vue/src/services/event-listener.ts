import { Container, Service } from 'typedi'

import { HexagonLayerService, LayerElementService, RouterService, TrailService } from '@/services'

@Service()
export default class EventListenerService {
  constructor(
    private _hexagonLayerService: HexagonLayerService,
    private _layerElementService: LayerElementService,
    private _routerService: RouterService,
    private _trailService: TrailService
  ) {
    this._hexagonLayerService = Container.get(HexagonLayerService)
    this._layerElementService = Container.get(LayerElementService)
    this._routerService = Container.get(RouterService)
    this._trailService = Container.get(TrailService)
  }

  addDisplayLayerElementEventListener(): void {
    for (const el of document.querySelectorAll('.layer-element')) {
      el.addEventListener('click', (evt): void => this.onDisplayLayerElementClickHandler(evt))
    }
  }

  removeDisplayLayerElementEventListener(): void {
    for (const el of document.querySelectorAll('.layer-element')) {
      el.removeEventListener('click', (evt): void => this.onDisplayLayerElementClickHandler(evt))
    }
  }

  addHexagonLayerEventListeners(): void {
    for (const el of document.querySelectorAll('input.props')) {
      el.addEventListener('change', (evt): void => this.onSetHexagonLayerPropsChangeHandler(evt))
      el.addEventListener('mouseover', (evt): void => this.onInputElementMouseEventHandler(evt))
      el.addEventListener('mouseout', (evt): void => this.onInputElementMouseEventHandler(evt))
    }
    for (const el of document.querySelectorAll('button#reset')) {
      el.addEventListener('click', (evt): void => this.onResetHexagonLayerPropsClickHandler(evt))
    }
    for (const el of document.querySelectorAll('button#mapbox')) {
      el.addEventListener('click', (evt): void => this.onReturnToTrailsClickHandler(evt))
    }
  }

  removeHexagonLayerEventListeners(): void {
    for (const el of document.querySelectorAll('input.props')) {
      el.removeEventListener('change', (evt): void => this.onSetHexagonLayerPropsChangeHandler(evt))
      el.removeEventListener('mouseover', (evt): void => this.onInputElementMouseEventHandler(evt))
      el.removeEventListener('mouseout', (evt): void => this.onInputElementMouseEventHandler(evt))
    }
    for (const el of document.querySelectorAll('button#reset')) {
      el.removeEventListener('click', (evt): void => this.onResetHexagonLayerPropsClickHandler(evt))
    }
    for (const el of document.querySelectorAll('button#mapbox')) {
      el.removeEventListener('click', (evt): void => this.onReturnToTrailsClickHandler(evt))
    }
  }

  addSelectTrailChangeEventListener(): void {
    for (const el of document.querySelectorAll('select.trails')) {
      el.addEventListener('change', (evt): void => this.onSelectTrailChangeHandler(evt))
    }
  }

  removeSelectTrailChangeEventListener(): void {
    for (const el of document.querySelectorAll('select.trails')) {
      el.removeEventListener('change', (evt): void => this.onSelectTrailChangeHandler(evt))
    }
  }

  private onDisplayLayerElementClickHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const { target: { id } }: Record<string, any> = evt
    id && this._layerElementService.displayLayerElement(id)
  }

  private onInputElementMouseEventHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const { target: { id } }: Record<string, any> = evt
    const label = (el: Element): boolean =>
      el.innerHTML.replace(' ', '').toLowerCase() === (id as string).toLowerCase()
    const el = [...document.querySelectorAll('label.props')].find(label)
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    evt.type === 'mouseover' ? el!.classList.add('mouseover') : el!.classList.remove('mouseover')
  }

  private onSetHexagonLayerPropsChangeHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const { target: { id: prop, value } }: Record<string, any> = evt
    prop && value && this._hexagonLayerService.setHexagonLayerPropsState(prop, value)
  }

  private onResetHexagonLayerPropsClickHandler(evt: Event): void {
    evt.stopPropagation()
    this._hexagonLayerService.resetHexagonLayerPropsState()
  }

  private onReturnToTrailsClickHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const { target: { id } }: Record<string, any> = evt
    id && this._routerService.setRoute(id)
  }

  private onSelectTrailChangeHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const { target: { value: trailName } }: Record<string, any> = evt
    trailName && this._trailService.selectTrail(trailName)
  }
}
