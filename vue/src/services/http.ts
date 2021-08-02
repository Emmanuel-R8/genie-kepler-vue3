import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Container, Service } from 'typedi'

import { AxiosService } from '@/services'

@Service()
export default class HttpService {
  constructor(private _axiosService: AxiosService) {
    this._axiosService = Container.get(AxiosService)
  }

  async getRequest(url: string, params?: AxiosRequestConfig): Promise<AxiosResponse> {
    const { httpClient: http } = this._axiosService
    return await http.get<Record<string, string>>(url, params)
  }
}
