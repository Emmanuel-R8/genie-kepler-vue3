import { Container, Service } from 'typedi'

import { AxiosService, DataService } from '@/services'

@Service()
export default class AppService {
  constructor(private _axiosService: AxiosService, private _dataService: DataService) {
    this._axiosService = Container.get(AxiosService)
    this._dataService = Container.get(DataService)
  }

  async loadData(): Promise<void> {
    this.createAxiosInstance()
    await this._dataService.loadData()
  }

  private createAxiosInstance(): void {
    this._axiosService.createInstance()
  }
}
