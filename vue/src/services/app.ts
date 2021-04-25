import { Container, Service } from 'typedi'

import { DataService, MapboxService } from '@/services'

@Service()
export default class AppService {
  constructor(private _dataService: DataService, private _mapboxService: MapboxService) {
    this._dataService = Container.get(DataService)
    this._mapboxService = Container.get(MapboxService)
  }

  loadApp(): void {
    this.loadData()
    this.loadMap()
  }

  private loadData(): void {
    this._dataService.loadData()
  }

  private async loadMap(): Promise<void> {
    await this._dataService.getMapboxAccessToken()
    this._mapboxService.loadMapbox()
  }
}
