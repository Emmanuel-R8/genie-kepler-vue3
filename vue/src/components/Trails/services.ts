import { Container, Service } from 'typedi'

//
// Imports common to all components
//
import { trails_Config } from './config'
import { ITrail } from './interfaces'
import { Map_Service } from '../Mapbox/services'

@Service()
export class Trail_Service {
    private _trails: ITrail[] = trails_Config

    constructor(private _mapService: Map_Service) {
        this._mapService = Container.get(Map_Service)
    }

    selectTrail(trailName: string): void {
        const isSelected = (trail: ITrail): boolean => trail.name === trailName
        const trail = this._trails.find(isSelected)
        trail && this._mapService.flyTo(trail)
    }
}
