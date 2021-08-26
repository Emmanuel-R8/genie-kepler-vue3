import axios, { AxiosInstance, AxiosStatic } from 'axios'
import { Service } from 'typedi'

import { Urls } from '@/enums'

@Service()
export class Axios_Common_Service {
    private _urls: Record<string, string> = Urls

    constructor(private _axios: AxiosStatic, private _httpClient: AxiosInstance) {
        this._axios = axios
    }

    get httpClient(): AxiosInstance {
        return this._httpClient
    }

    createHttpClient(): void {
        const { create } = this._axios
        const { API_BASE_URL } = this._urls
        this._httpClient = create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            responseType: 'json',
            timeout: 2000
        })
    }
}
