import { Container, Service } from 'typedi'

import { IEventTarget } from '@/interfaces'
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
      el.addEventListener('change', (evt): void => this.onSetHexagonLayerReactivePropsChangeHandler(evt))
      el.addEventListener('mouseover', (evt): void => this.onInputElementMouseEventHandler(evt))
      el.addEventListener('mouseout', (evt): void => this.onInputElementMouseEventHandler(evt))
    }
    for (const el of document.querySelectorAll('button#reset')) {
      el.addEventListener('click', (evt): void => this.onResetHexagonLayerReactivePropsClickHandler(evt))
    }
    for (const el of document.querySelectorAll('button#mapbox')) {
      el.addEventListener('click', (evt): void => this.onReturnToTrailsClickHandler(evt))
    }
  }

  removeHexagonLayerEventListeners(): void {
    for (const el of document.querySelectorAll('input.props')) {
      el.removeEventListener('change', (evt): void => this.onSetHexagonLayerReactivePropsChangeHandler(evt))
      el.removeEventListener('mouseover', (evt): void => this.onInputElementMouseEventHandler(evt))
      el.removeEventListener('mouseout', (evt): void => this.onInputElementMouseEventHandler(evt))
    }
    for (const el of document.querySelectorAll('button#reset')) {
      el.removeEventListener('click', (evt): void => this.onResetHexagonLayerReactivePropsClickHandler(evt))
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
    const { target: { id } }: IEventTarget = evt as any
    id && this._layerElementService.displayLayerElement(id)
  }

  private onInputElementMouseEventHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    const { target: { id } }: IEventTarget = evt as any
    const label = (el: Element): boolean =>
      el.innerHTML.includes(' ')
        ? el.innerHTML.replace(' ', '').toLowerCase() === id.toLowerCase()
        : el.innerHTML.toLowerCase() === id
    const el = [...document.querySelectorAll('label.props')].find(label)
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    evt.type === 'mouseover' ? el!.classList.add('mouseover') : el!.classList.remove('mouseover')
  }

  private onSetHexagonLayerReactivePropsChangeHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    const { target: { id: prop, value } }: IEventTarget = evt as any
    prop && value && this._hexagonLayerService.setHexagonLayerReactivePropsState({ prop, value })
  }

  private onResetHexagonLayerReactivePropsClickHandler(evt: Event): void {
    evt.stopPropagation()
    this._hexagonLayerService.resetHexagonLayerReactivePropsState()
  }

  private onReturnToTrailsClickHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    const { target: { id } }: IEventTarget = evt as any
    id && this._routerService.setRoute(id)
  }

  private onSelectTrailChangeHandler(evt: Event): void {
    evt.stopPropagation()
    /* prettier-ignore */
    const { target: { value: trailName } }: IEventTarget = evt as any
    trailName && this._trailService.selectTrail(trailName)
  }
}
