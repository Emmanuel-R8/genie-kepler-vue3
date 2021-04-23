import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Service } from 'typedi'

import { AxiosService } from '@/services'

@Service()
export default class HttpService {
  async get(url: string, params: AxiosRequestConfig = {}): Promise<AxiosResponse> {
    return await AxiosService.get(url, params)
  }
}
