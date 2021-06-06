import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Container, Service } from 'typedi'

import { AxiosService } from '@/services'

@Service()
export default class HttpService {
  constructor(private _axiosService: AxiosService) {
    this._axiosService = Container.get(AxiosService)
  }

  async get(url: string, params: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    return await this._axiosService.instance.get(url, params)
  }
}
