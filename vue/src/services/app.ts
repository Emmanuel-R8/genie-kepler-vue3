import { Container, Service } from 'typedi'

import { AxiosService, DataService } from '@/services'

@Service()
export default class AppService {
  constructor(private _axiosService: AxiosService, private _dataService: DataService) {
    this._axiosService = Container.get(AxiosService)
    this._dataService = Container.get(DataService)
  }

  async loadData(): Promise<void> {
    this.createHttpClient()
    await this._dataService.loadData()
  }

  private createHttpClient(): void {
    this._axiosService.createHttpClient()
  }
}
