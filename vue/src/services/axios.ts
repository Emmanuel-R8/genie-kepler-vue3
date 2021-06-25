import axios, { AxiosInstance, AxiosStatic } from 'axios'
import { Service } from 'typedi'

import { Urls } from '@/enums'

@Service()
export default class AxiosService {
  private _axios: AxiosStatic = axios
  private _urls: Record<string, string> = Urls

  constructor(private _instance: AxiosInstance) {}

  get instance(): AxiosInstance {
    return this._instance
  }

  createInstance(): void {
    const { API_BASE_URL } = this._urls
    this._instance = this._axios.create({ baseURL: API_BASE_URL })
  }
}
