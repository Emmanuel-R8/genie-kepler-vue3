import axios, { AxiosInstance, AxiosStatic } from 'axios'
import { Service } from 'typedi'

import { Urls } from '@/enums'

@Service()
export default class AxiosService {
  private _urls: Record<string, string> = Urls

  constructor(private _axios: AxiosStatic, private _httpClient: AxiosInstance) {
    this._axios = axios
  }

  get httpClient(): AxiosInstance {
    return this._httpClient
  }

  createHttpClient(): void {
    const { API_BASE_URL } = this._urls
    this._httpClient = this._axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Accept: 'application/json'
      },
      timeout: 2000
    })
  }
}
