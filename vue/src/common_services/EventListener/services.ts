import { Container, Service } from 'typedi';

//
// Imports common to all components
//
import { Router_Common_Service } from '../../common_services/Router/services';

import { HexagonLayer_Service } from '../../components/HexagonLayer/services';
import { LayerElement_Service } from '../../components/LayerElement/services';
import { Trail_Service } from '../../components/Trails/services';

@Service()
export class EventListener_Common_Service {
    constructor(
        private _hexagonLayerService: HexagonLayer_Service,
        private _layerElementService: LayerElement_Service,
        private _routerService: Router_Common_Service,
        private _trailService: Trail_Service
    ) {
        this._hexagonLayerService = Container.get(HexagonLayer_Service);
        this._layerElementService = Container.get(LayerElement_Service);
        this._routerService = Container.get(Router_Common_Service);
        this._trailService = Container.get(Trail_Service);
    }

    addDisplayLayerElementEventListener(): void {
        for (const el of document.querySelectorAll('.layer-element')) {
            el.addEventListener('click', (evt): void => this.onDisplayLayerElementClickHandler(evt));
        }
    }

    removeDisplayLayerElementEventListener(): void {
        for (const el of document.querySelectorAll('.layer-element')) {
            el.removeEventListener('click', (evt): void => this.onDisplayLayerElementClickHandler(evt));
        }
    }

    addHexagonLayerEventListeners(): void {
        for (const el of document.querySelectorAll('input.props')) {
            el.addEventListener('change', (evt): void => this.onSetHexagonLayerPropsChangeHandler(evt));
            el.addEventListener('mouseover', (evt): void => this.onInputElementMouseEventHandler(evt));
            el.addEventListener('mouseout', (evt): void => this.onInputElementMouseEventHandler(evt));
        }
        for (const el of document.querySelectorAll('button#reset')) {
            el.addEventListener('click', (evt): void => this.onResetHexagonLayerPropsClickHandler(evt));
        }
        for (const el of document.querySelectorAll('button#mapbox')) {
            el.addEventListener('click', (evt): void => this.onReturnToTrailsClickHandler(evt));
        }
    }

    removeHexagonLayerEventListeners(): void {
        for (const el of document.querySelectorAll('input.props')) {
            el.removeEventListener('change', (evt): void => this.onSetHexagonLayerPropsChangeHandler(evt));
            el.removeEventListener('mouseover', (evt): void => this.onInputElementMouseEventHandler(evt));
            el.removeEventListener('mouseout', (evt): void => this.onInputElementMouseEventHandler(evt));
        }
        for (const el of document.querySelectorAll('button#reset')) {
            el.removeEventListener('click', (evt): void => this.onResetHexagonLayerPropsClickHandler(evt));
        }
        for (const el of document.querySelectorAll('button#mapbox')) {
            el.removeEventListener('click', (evt): void => this.onReturnToTrailsClickHandler(evt));
        }
    }

    addSelectTrailChangeEventListener(): void {
        for (const el of document.querySelectorAll('select.trails')) {
            el.addEventListener('change', (evt): void => this.onSelectTrailChangeHandler(evt));
        }
    }

    removeSelectTrailChangeEventListener(): void {
        for (const el of document.querySelectorAll('select.trails')) {
            el.removeEventListener('change', (evt): void => this.onSelectTrailChangeHandler(evt));
        }
    }

    private onDisplayLayerElementClickHandler(evt: Event): void {
        evt.stopPropagation();
        /* prettier-ignore */
        const { target: { id } }: Record<string, any> = evt
        id && this._layerElementService.displayLayerElement(id);
    }

    private onInputElementMouseEventHandler(evt: Event): void {
        evt.stopPropagation();
        /* prettier-ignore */
        const { target: { id } }: Record<string, any> = evt
        const label = (el: Element): boolean =>
            el.innerHTML.includes(' ')
                ? el.innerHTML.replace(' ', '').toLowerCase() === (id as string).toLowerCase()
                : el.innerHTML.toLowerCase() === id;
        const el = [...document.querySelectorAll('label.props')].find(label);
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        evt.type === 'mouseover' ? el!.classList.add('mouseover') : el!.classList.remove('mouseover');
    }

    private onSetHexagonLayerPropsChangeHandler(evt: Event): void {
        evt.stopPropagation();
        /* prettier-ignore */
        const { target: { id: prop, value } }: Record<string, any> = evt
        prop && value && this._hexagonLayerService.setHexagonLayerPropsState({ prop, value });
    }

    private onResetHexagonLayerPropsClickHandler(evt: Event): void {
        evt.stopPropagation();
        this._hexagonLayerService.resetHexagonLayerPropsState();
    }

    private onReturnToTrailsClickHandler(evt: Event): void {
        evt.stopPropagation();
        /* prettier-ignore */
        const { target: { id } }: Record<string, any> = evt
        id && this._routerService.setRoute(id);
    }

    private onSelectTrailChangeHandler(evt: Event): void {
        evt.stopPropagation();
        /* prettier-ignore */
        const { target: { value: trailName } }: Record<string, any> = evt
        trailName && this._trailService.selectTrail(trailName);
    }
}
