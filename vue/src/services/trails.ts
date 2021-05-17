import { Container, Service } from 'typedi'

import { trails } from '@/config'
import { ITrail } from '@/interfaces'
import { MapService } from '@/services'

@Service()
export default class TrailsService {
  private _trails: ITrail[] = trails

  constructor(private _mapService: MapService) {
    this._mapService = Container.get(MapService)
  }

  selectTrail = (trailName: string): void => {
    const i = this._trails.findIndex((trail: ITrail) => trail.name === trailName)
    i > 0 && this._mapService.flyTo(this._trails[i])
  }
}
