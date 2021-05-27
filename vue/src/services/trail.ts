import { Container, Service } from 'typedi'

import { trails } from '@/config'
import { ITrail } from '@/interfaces'
import { MapService } from '@/services'

@Service()
export default class TrailService {
  private _trails: ITrail[] = trails

  constructor(private _mapService: MapService) {
    this._mapService = Container.get(MapService)
  }

  selectTrail = (trailName: string): void => {
    const trail = (trail: ITrail) => trail.name === trailName
    const i: number = this._trails.findIndex(trail)
    i > 0 && this._mapService.flyTo(this._trails[i])
  }
}
