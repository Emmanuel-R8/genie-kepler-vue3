import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Container, Service } from 'typedi'

import { AxiosService } from '@/services'

@Service()
export default class HttpService {
  constructor(private _axiosService: AxiosService) {
    this._axiosService = Container.get(AxiosService)
  }

  async get(url: string, params?: AxiosRequestConfig): Promise<AxiosResponse> {
    const { instance: http } = this._axiosService
    return await http.get(url, params)
  }
}
