import { Container, Service } from 'typedi'

import { LayerElements, States } from '@/enums'
import { NavigationControlPosition } from '@/types'

import { mapbox_Config } from './config'
import { IMapbox_Settings, IMapboxSettings, IMapStyle } from './interfaces'
import { Popup_Service, State_Service } from '@/services'

import { FillLayer, LineLayer, Map, MapboxOptions, NavigationControl, MapLayerMouseEvent, SkyLayer } from 'mapbox-gl'

import { ILayerVisibility } from '../LayerElements/interfaces'
import { ITrail } from '../Trails/interfaces'

import { Layer_Service, LayerVisibility_Service } from '../LayerElement/services'
import { Marker_Service } from '../Marker/services'
import { Modal_Service } from '../Modal/services'

import {} from '@/services'

@Service()
export class MapStyle_Service {
    private _states: Record<string, string> = States

    constructor(private _mapStyle: string, private _stateService: State_Service) {
        this._stateService = Container.get(State_Service)
        this.setMapStyle()
    }

    get mapStyle(): string {
        return this._mapStyle
    }

    private get _state(): IMapStyle[] {
        const { MAP_STYLES } = this._states
        return <IMapStyle[]>this._stateService.getStaticState(MAP_STYLES)
    }

    private set _state(mapStyles: IMapStyle[]) {
        const { MAP_STYLES } = this._states
        this._stateService.setStaticState(MAP_STYLES, mapStyles)
    }

    setMapStyle(): void {
        const mapStyles = this._state
        const isActive = (mapStyle: IMapStyle): boolean => mapStyle.isActive
        const mapStyle = mapStyles.find(isActive)
        mapStyle && (this._mapStyle = mapStyle.url)
    }

    setMapStyleState(): void {
        const state = this._state
        state.forEach((mapStyle): boolean => (mapStyle.isActive = !mapStyle.isActive))
        this._state = state
    }
}

@Service()
export class Mapbox_Service {
    private _navigationControl = mapbox_Config.navigationControl
    private _options: IMapbox_Settings = mapbox_Config.options
    private _states: Record<string, string> = States

    constructor(private _map: Map, private _mapStyleService: MapStyle_Service, private _stateService: State_Service) {
        this._mapStyleService = Container.get(MapStyle_Service)
        this._stateService = Container.get(State_Service)
    }

    get map(): Map {
        return this._map
    }

    private get _state(): IMapboxSettings {
        const { MAPBOX_SETTINGS } = this._states
        return <IMapboxSettings>this._stateService.getStaticState(MAPBOX_SETTINGS)
    }

    private set _state(settings: IMapboxSettings) {
        const { MAPBOX_SETTINGS } = this._states
        this._stateService.setStaticState(MAPBOX_SETTINGS, settings)
    }

    loadMapbox(): void {
        const { position, visualizePitch } = this._navigationControl
        const options: MapboxOptions = { ...this._options, ...this._state }
        this._map = new Map(options)
            .addControl(new NavigationControl({ visualizePitch }), <NavigationControlPosition>position)
            .on('idle', (): void => this.onMapIdleHandler())
    }

    removeMapInstance(): void {
        this._map.remove()
    }

    private onMapIdleHandler(): void {
        this.setMapboxSettingsState()
    }

    private setMapboxSettingsState(): void {
        const { mapStyle: style } = this._mapStyleService
        this._state = {
            bearing: this._map.getBearing(),
            center: this._map.getCenter(),
            pitch: this._map.getPitch(),
            zoom: this._map.getZoom(),
            style
        }
    }
}

@Service()
export class Map_Service {
    private _layerElements: Record<string, string> = LayerElements
    private _skyLayer = <SkyLayer>mapbox_Config.skyLayer

    constructor(
        private _map: Map,
        private _layerService: Layer_Service,
        private _layerVisibilityService: LayerVisibility_Service,
        private _mapboxService: Mapbox_Service,
        private _mapStyleService: MapStyle_Service,
        private _markerService: Marker_Service,
        private _modalService: Modal_Service,
        private _popupService: Popup_Service
    ) {
        this._layerService = Container.get(Layer_Service)
        this._layerVisibilityService = Container.get(LayerVisibility_Service)
        this._mapboxService = Container.get(Mapbox_Service)
        this._mapStyleService = Container.get(MapStyle_Service)
        this._markerService = Container.get(Marker_Service)
        this._modalService = Container.get(Modal_Service)
        this._popupService = Container.get(Popup_Service)
    }

    loadMapLayer(): void {
        this._mapboxService.loadMapbox()
        const { map } = this._mapboxService
        this._map = map.on('load', (): void => this.onMapLoadHandler())
    }

    flyTo({ center, zoom }: ITrail): void {
        this._map.flyTo({
            center,
            zoom
        })
    }

    setMapStyle(): void {
        const { mapStyle } = this._mapStyleService
        this._map.setStyle(mapStyle)
        this.resetMapFeatures()
    }

    setLayerVisibility(id: string): void {
        const { BIOSPHERE } = this._layerElements
        const { state: layers } = this._layerVisibilityService
        layers[id as keyof ILayerVisibility].isActive
            ? this._map.setLayoutProperty(id, 'visibility', 'visible')
            : this._map.setLayoutProperty(id, 'visibility', 'none')
        id === BIOSPHERE && this.setLayerVisibilityEventListeners(id, layers)
    }

    private onMapLoadHandler(): void {
        this.addSkyLayer()
        this.addLayers()
        this.hideModal()
    }

    private addSkyLayer(): void {
        this._map.addLayer(this._skyLayer)
    }

    private addLayers(): void {
        const { layers } = this._layerService
        for (const layer of layers) {
            const { id } = layer
            this._map.addLayer(<FillLayer | LineLayer>layer)
            this.setLayerVisibility(id)
        }
    }

    private hideModal(): void {
        this._modalService.hideModal()
    }

    private setLayerVisibilityEventListeners(id: string, layers: ILayerVisibility): void {
        layers[id as keyof ILayerVisibility].isActive
            ? this._map
                  .on('click', id, (evt: MapLayerMouseEvent): void => this.onMapClickHandler(evt))
                  .on('mouseenter', id, (): void => this.onMapMouseEnterHandler())
                  .on('mouseleave', id, (): void => this.onMapMouseLeaveHandler())
            : this._map
                  .off('click', id, this.onMapClickHandler)
                  .off('mouseenter', id, this.onMapMouseEnterHandler)
                  .off('mouseleave', id, this.onMapMouseLeaveHandler)
    }

    private onMapClickHandler(evt: MapLayerMouseEvent): void {
        this._popupService.addLayerPopup(evt)
    }

    private onMapMouseEnterHandler(): void {
        this._map.getCanvas().style.cursor = 'pointer'
    }

    private onMapMouseLeaveHandler(): void {
        this._map.getCanvas().style.cursor = ''
        this._popupService.removePopup()
    }

    private resetMapFeatures(): void {
        /* reset layers & marker visibility after delay to set mapStyle (basemap) */
        this.resetSkyLayer()
        this.resetLayers()
        this.resetMarkerVisibility()
    }

    private resetSkyLayer(): void {
        setTimeout((): void => this.addSkyLayer(), 100)
    }

    private resetLayers(): void {
        setTimeout((): void => this.addLayers(), 200)
    }

    private resetMarkerVisibility(): void {
        const { mapStyle } = this._mapStyleService
        mapStyle.includes('outdoors')
            ? setTimeout((): void => this.setMarkerVisibility(), 1000)
            : setTimeout((): void => this.setMarkerVisibility(), 200)
    }

    private setMarkerVisibility(): void {
        this._markerService.setMarkerVisibility()
    }
}
