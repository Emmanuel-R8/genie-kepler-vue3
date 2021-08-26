import { Container, Service } from 'typedi'
import { Axios_Service, Data_Service } from '@/common_services'

@Service()
export default class AppService {
    constructor(private _axiosService: Axios_Service, private _dataService: Data_Service) {
        this._axiosService = Container.get(Axios_Service)
        this._dataService = Container.get(Data_Service)
    }

    async loadData(): Promise<void> {
        this.createHttpClient()
        await this._dataService.loadData()
    }

    private createHttpClient(): void {
        this._axiosService.createHttpClient()
    }
}
