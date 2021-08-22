import { Container, Service } from 'typedi'

import { LayerElements, States } from '@/enums'
import { ILayerVisibility } from '@/interfaces'
import { StateService } from '@/services'

@Service()
export default class LayerVisibilityService {
    private _layerElements: Record<string, string> = LayerElements
    private _states: Record<string, string> = States

    constructor(private _stateService: StateService) {
        this._stateService = Container.get(StateService)
    }

    get state(): ILayerVisibility {
        const { LAYER_VISIBILITY } = this._states
        return <ILayerVisibility>this._stateService.getStaticState(LAYER_VISIBILITY)
    }

    private set _state(layers: ILayerVisibility) {
        const { LAYER_VISIBILITY } = this._states
        this._stateService.setStaticState(LAYER_VISIBILITY, layers)
    }

    setLayerVisibilityState(id: string): void {
        const { BIOSPHERE, BIOSPHERE_BORDER } = this._layerElements
        const state = this.state
        state[id as keyof ILayerVisibility].isActive = !state[id as keyof ILayerVisibility].isActive
        if (id === BIOSPHERE) {
            state[BIOSPHERE_BORDER as keyof ILayerVisibility].isActive =
                !state[BIOSPHERE_BORDER as keyof ILayerVisibility].isActive
        }
        this._state = state
    }
}
