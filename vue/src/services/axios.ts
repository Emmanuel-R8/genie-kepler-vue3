import axios, { AxiosInstance, AxiosStatic } from 'axios'
import { Service } from 'typedi'

import { Urls } from '@/enums'

@Service()
export default class AxiosService {
  private _urls: Record<string, string> = Urls

  constructor(private _axios: AxiosStatic, private _instance: AxiosInstance) {
    this._axios = axios
  }

  get instance(): AxiosInstance {
    return this._instance
  }

  createInstance(): void {
    const { create } = this._axios
    const { API_BASE_URL } = this._urls
    this._instance = create({ baseURL: API_BASE_URL })
  }
}
