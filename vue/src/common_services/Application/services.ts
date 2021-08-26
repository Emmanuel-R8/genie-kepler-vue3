import { Container, Service } from 'typedi'

//
// Imports common to all components
//
import { Axios_Common_Service } from '../../common_services/Axios/services'
import { Data_Common_Service } from '../../common_services/Data/services'

@Service()
export class Application_Common_Service {
    constructor(private _axiosService: Axios_Common_Service, private _dataService: Data_Common_Service) {
        this._axiosService = Container.get(Axios_Common_Service)
        this._dataService = Container.get(Data_Common_Service)
    }

    async loadData(): Promise<void> {
        this.createHttpClient()
        await this._dataService.loadData()
    }

    private createHttpClient(): void {
        this._axiosService.createHttpClient()
    }
}
