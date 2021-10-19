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

  selectTrail(trailName: string): void {
    const isSelected = (trail: ITrail): boolean => trail.name === trailName
    const trail = this._trails.find(isSelected)
    trail && this._mapService.mapFlyTo(trail)
  }
}
