import { AxiosResponse } from 'axios'
import { FeatureCollection } from 'geojson'

export interface IHttpParams {
    fields: string
    table: string
}

export interface IHttpResponse<F = FeatureCollection, R = Record<string, string>> extends AxiosResponse {
    data: F
    token: R
}
