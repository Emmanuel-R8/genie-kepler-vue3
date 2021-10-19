import { Container, Service } from 'typedi'

import { StaticStates } from '@/enums'
import { IMapStyle } from '@/interfaces'
import { StateService } from '@/services'

@Service()
export default class MapStyleService {
  private _staticStates: Record<string, string> = StaticStates

  constructor(private _mapStyle: string, private _stateService: StateService) {
    this._stateService = Container.get(StateService)
    this.setMapStyle()
  }

  get mapStyle(): string {
    return this._mapStyle
  }

  private get _state(): IMapStyle[] {
    const { MAP_STYLES } = this._staticStates
    return <IMapStyle[]>this._stateService.getStaticState(MAP_STYLES)
  }

  private set _state(mapStyles: IMapStyle[]) {
    const { MAP_STYLES } = this._staticStates
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
