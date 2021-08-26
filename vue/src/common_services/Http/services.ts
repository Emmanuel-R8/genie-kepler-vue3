import { Container, Service } from 'typedi'

//
// Imports common to all components
//
import { Axios_Common_Service } from '../../common_services/Axios/services'

import { AxiosRequestConfig, AxiosResponse } from 'axios'

@Service()
export class Http_Common_Service {
    constructor(private _axiosService: Axios_Common_Service) {
        this._axiosService = Container.get(Axios_Common_Service)
    }

    async getRequest(url: string, params?: AxiosRequestConfig): Promise<AxiosResponse> {
        const { httpClient: http } = this._axiosService
        return await http.get<Record<string, string>>(url, params)
    }
}
