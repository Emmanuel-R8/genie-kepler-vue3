import axios, { AxiosInstance, AxiosStatic } from 'axios'
import { Service } from 'typedi'

import { Urls } from '@/enums'

@Service()
export default class AxiosService {
  constructor(private _axios: AxiosStatic, private _instance: AxiosInstance) {
    this._axios = axios
  }

  get instance(): AxiosInstance {
    return this._instance
  }

  createInstance(): void {
    this._instance = this._axios.create({ baseURL: Urls.API_BASE_URL })
  }
}
