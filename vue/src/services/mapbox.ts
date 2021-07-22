import mapboxgl, { Map, MapboxOptions, NavigationControl } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { mapbox } from '@/config'
import { EndPoints, States } from '@/enums'
import { IMapboxOptions, IMapboxSettings } from '@/interfaces'
import { HttpService, LogService, MapStyleService, ModalService, StateService } from '@/services'
import { NavigationControlPosition } from '@/types'

@Service()
export default class MapboxService {
  private _endPoints: Record<string, string> = EndPoints
  private _navigationControl = mapbox.navigationControl
  private _options: IMapboxOptions = mapbox.options
  private _states: Record<string, string> = States

  constructor(
    private _map: Map,
    private _httpService: HttpService,
    private _logService: LogService,
    private _mapStyleService: MapStyleService,
    private _modalService: ModalService,
    private _stateService: StateService
  ) {
    this._httpService = Container.get(HttpService)
    this._logService = Container.get(LogService)
    this._mapStyleService = Container.get(MapStyleService)
    this._modalService = Container.get(ModalService)
    this._stateService = Container.get(StateService)
  }

  get accessToken(): string {
    const { accessToken } = mapboxgl
    return accessToken
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

  async getAccessToken(): Promise<void> {
    try {
      const { MAPBOX_ACCESS_TOKEN_ENDPOINT } = this._endPoints
      /* prettier-ignore */
      const { data: { token } } = await this._httpService.getRequest(MAPBOX_ACCESS_TOKEN_ENDPOINT)
      token && <string>token
        ? this.setAccessToken(<string>token)
        : this._logService.consoleLog(`No Mapbox Access Token Found:\n`, <string>token)
    } catch (err) {
      this._logService.consoleError(`${this.getAccessToken.name} Http Failed:\n`, err)
    }
  }

  loadMapbox(): void {
    const { position, visualizePitch } = this._navigationControl
    const options: MapboxOptions = { ...this._options, ...this._state }
    this._map = new Map(options)
      .addControl(new NavigationControl({ visualizePitch }), <NavigationControlPosition>position)
      .on('load', (): void => {
        this.onMapLoadHandler()
      })
      .on('idle', (): void => {
        this.onMapIdleHandler()
      })
  }

  removeMapInstance(): void {
    this._map.remove()
  }

  private onMapLoadHandler(): void {
    this.setMapStyle()
    this.hideModal()
  }

  private onMapIdleHandler(): void {
    this.setMapboxSettingsState()
  }

  private hideModal(): void {
    this._modalService.hideModal(100)
  }

  private setAccessToken(token: string): void {
    mapboxgl.accessToken = token
  }

  private setMapStyle(): void {
    const { style: mapStyle } = this._state
    this._mapStyleService.mapStyle = mapStyle
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
