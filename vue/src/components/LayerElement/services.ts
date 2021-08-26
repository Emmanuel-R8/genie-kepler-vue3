import { Container, Service } from 'typedi'
import cloneDeep from 'lodash.clonedeep'
import { FeatureCollection } from 'geojson'

//
// Global state
//
import { States } from '../../Global_State'

//
// Imports common to all components
//
import { LayerElement } from '@/types'
import { LayerElements } from '@/enums'
import { Router_Common_Service } from '../../common_services/Router/services'
import { State_Common_Service } from '../../common_services/State/services'

//
// Component-specific
//
import { ILayer, ILayerElement_ReactiveProps } from './interfaces'
import { ILayerVisibility_StaticProps } from '../LayerElements/interfaces'
import { Map_Service, MapStyle_Service } from '../Mapbox/services'
import { Marker_Service } from '../Marker/services'

@Service()
export class LayerElement_Service {
    private _layerElements: Record<string, string> = LayerElements
    private _states: Record<string, string> = States

    constructor(
        private _layerVisibilityService: LayerVisibility_Service,
        private _mapService: Map_Service,
        private _mapStyleService: MapStyle_Service,
        private _markerService: Marker_Service,
        private _routerService: Router_Common_Service,
        private _stateService: State_Common_Service
    ) {
        this._layerVisibilityService = Container.get(LayerVisibility_Service)
        this._mapService = Container.get(Map_Service)
        this._mapStyleService = Container.get(MapStyle_Service)
        this._markerService = Container.get(Marker_Service)
        this._routerService = Container.get(Router_Common_Service)
        this._stateService = Container.get(State_Common_Service)
    }

    get state(): ILayerElement_ReactiveProps[] {
        const { LAYER_ELEMENTS } = this._states
        return <ILayerElement_ReactiveProps[]>this._stateService.getReactiveState(LAYER_ELEMENTS)
    }

    private set _state(layerElements: ILayerElement_ReactiveProps[]) {
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
        const layerElement = (layerElement: ILayerElement_ReactiveProps): boolean => layerElement.id === id
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

@Service()
export class LayerVisibility_Service {
    private _layerElements: Record<string, string> = LayerElements
    private _states: Record<string, string> = States

    constructor(private _stateService: State_Common_Service) {
        this._stateService = Container.get(State_Common_Service)
    }

    get state(): ILayerVisibility_StaticProps {
        const { LAYER_VISIBILITY } = this._states
        return <ILayerVisibility_StaticProps>this._stateService.getStaticState(LAYER_VISIBILITY)
    }

    private set _state(layers: ILayerVisibility_StaticProps) {
        const { LAYER_VISIBILITY } = this._states
        this._stateService.setStaticState(LAYER_VISIBILITY, layers)
    }

    setLayerVisibilityState(id: string): void {
        const { BIOSPHERE, BIOSPHERE_BORDER } = this._layerElements
        const state = this.state
        state[id as keyof ILayerVisibility_StaticProps].isActive =
            !state[id as keyof ILayerVisibility_StaticProps].isActive
        if (id === BIOSPHERE) {
            state[BIOSPHERE_BORDER as keyof ILayerVisibility_StaticProps].isActive =
                !state[BIOSPHERE_BORDER as keyof ILayerVisibility_StaticProps].isActive
        }
        this._state = state
    }
}

@Service()
export class Layer_Service {
    constructor(private _layers: ILayer[]) {
        this._layers = []
    }

    get layers(): ILayer[] {
        return this._layers
    }

    setLayer(fc: FeatureCollection, layer: ILayer): void {
        this._layers.push(this.setLayerSourceData(fc, layer))
    }

    private setLayerSourceData(fc: FeatureCollection, layer: ILayer): ILayer {
        layer.source.data = fc
        return cloneDeep(layer)
    }
}
