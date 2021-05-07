import { Container, Service } from 'typedi'

import { DataService, MapService } from '@/services'

@Service()
export default class AppService {
  constructor(private _dataService: DataService, private _mapService: MapService) {
    this._dataService = Container.get(DataService)
    this._mapService = Container.get(MapService)
  }

  loadData(): void {
    this._dataService.loadData()
  }
  async loadMap(): Promise<void> {
    await this._dataService.getMapboxAccessToken()
    this._mapService.loadMap()
  }
}
