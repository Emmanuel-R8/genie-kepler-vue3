import { Container, Service } from 'typedi'

import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { Axios_Service } from '@/services'

@Service()
export default class HttpService {
    constructor(private _axiosService: Axios_Service) {
        this._axiosService = Container.get(Axios_Service)
    }

    async getRequest(url: string, params?: AxiosRequestConfig): Promise<AxiosResponse> {
        const { httpClient: http } = this._axiosService
        return await http.get<Record<string, string>>(url, params)
    }
}
