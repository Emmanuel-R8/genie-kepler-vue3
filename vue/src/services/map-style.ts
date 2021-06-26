import { Container, Service } from 'typedi'

import { States } from '@/enums'
import { IMapStyle } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class MapStyleService {
  private _states: Record<string, string> = States

  constructor(private _mapStyle: string, private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
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
    return <IMapStyle[]>this._storeService.getState(MAP_STYLES)
  }

  private set _state(mapStyles: IMapStyle[]) {
    const { MAP_STYLES } = this._states
    this._storeService.setState(MAP_STYLES, mapStyles)
  }

  setMapStyleState(): void {
    const mapStyles = this._state
    mapStyles.forEach((mapStyle: IMapStyle): boolean => (mapStyle.isActive = !mapStyle.isActive))
    this._state = mapStyles
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
