import { Container, Service } from 'typedi'

import { DataService, MapboxService } from '@/services'

@Service()
export default class AppService {
  constructor(private _dataService: DataService, private _mapboxService: MapboxService) {
    this._dataService = Container.get(DataService)
    this._mapboxService = Container.get(MapboxService)
  }

  loadData(): void {
    const dataService: DataService = Container.get(DataService)
    dataService.loadData()
  }

  async loadMap(): Promise<void> {
    await this._dataService.getMapboxAccessToken()
    this._mapboxService.loadMapbox()
  }
}
