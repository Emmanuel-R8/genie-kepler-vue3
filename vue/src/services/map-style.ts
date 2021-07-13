import { Container, Service } from 'typedi'

import { States } from '@/enums'
import { IMapStyle } from '@/interfaces'
import { StateService } from '@/services'

@Service()
export default class MapStyleService {
  private _states: Record<string, string> = States

  constructor(private _mapStyle: string, private _stateService: StateService) {
    this._stateService = Container.get(StateService)
  }

  get mapStyle(): string {
    this.getMapStyle()
    return this._mapStyle
  }

  set mapStyle(mapStyle: string) {
    this._mapStyle = mapStyle
  }

  private get _state(): IMapStyle[] {
    const { MAP_STYLES } = this._states
    return <IMapStyle[]>this._stateService.getStaticState(MAP_STYLES)
  }

  private set _state(mapStyles: IMapStyle[]) {
    const { MAP_STYLES } = this._states
    this._stateService.setStaticState(MAP_STYLES, mapStyles)
  }

  setMapStyleState(): void {
    const state = this._state
    state.forEach((mapStyle): boolean => (mapStyle.isActive = !mapStyle.isActive))
    this._state = state
  }

  private getMapStyle(): void {
    const mapStyles = this._state
    const isActive = (mapStyle: IMapStyle): boolean => mapStyle.isActive
    const i = mapStyles.findIndex(isActive)
    if (i >= 0) {
      const { url: mapStyle } = mapStyles[i]
      this._mapStyle = mapStyle
    }
  }
}
