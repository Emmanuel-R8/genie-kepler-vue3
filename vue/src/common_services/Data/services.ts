import { Container, Service } from 'typedi';

//
// Imports common to all components
//
import { Http_Common_Service } from '..//BaseHttp/services';
import { Log_Common_Service } from '../Log/services';

import { AxiosResponse } from 'axios';
import { DSVRowArray } from 'd3-dsv';
import { csv } from 'd3-fetch';
import { Feature, FeatureCollection } from 'geojson';
import mapboxgl from 'mapbox-gl';

import { EndPoints, Urls } from '@/enums';
import { IHttpParams, IHttpResponse } from '../BaseHttp/interfaces';

import { perLayer_Config } from '../../components/LayerElement/config';
import { ISingleLayer_StaticProps } from '../../components/LayerElement/interfaces';
import { Layer_Service } from '../../components/LayerElement/services';

import { markers_Config } from '../../components/Marker/config';
import { IMarker_StaticProps } from '../../components/Marker/interfaces';
import { Marker_Service } from '../../components/Marker/services';

@Service()
export class Data_Common_Service {
    private _endPoints: Record<string, string> = EndPoints;
    private _layers: ISingleLayer_StaticProps[] = perLayer_Config.staticProps;
    private _markers: IMarker_StaticProps[] = markers_Config.staticProps;
    private _urls: Record<string, string> = Urls;

    constructor(
        private _hexagonLayerData: number[][],
        private _httpService: Http_Common_Service,
        private _layerService: Layer_Service,
        private _logService: Log_Common_Service,
        private _markerService: Marker_Service
    ) {
        this._httpService = Container.get(Http_Common_Service);
        this._layerService = Container.get(Layer_Service);
        this._logService = Container.get(Log_Common_Service);
        this._markerService = Container.get(Marker_Service);
    }

    get hexagonLayerData(): number[][] {
        return this._hexagonLayerData;
    }

    get mapboxAccessToken(): string {
        const { accessToken } = mapboxgl;
        return accessToken;
    }

    async loadData(): Promise<void> {
        await this.getLayerData();
        await this.getMarkerData();
        await this.getHexagonLayerData();
    }

    async getMapboxAccessToken(): Promise<void> {
        const { MAPBOX_ACCESS_TOKEN_ENDPOINT } = this._endPoints;
        /* prettier-ignore */
        const { data: { token } } = <IHttpResponse<Record<string, string>>>
            await this.httpGetRequest(MAPBOX_ACCESS_TOKEN_ENDPOINT)
        this.setMapboxAccessToken(token);
    }

    private setMapboxAccessToken(token: string): void {
        token ? (mapboxgl.accessToken = token) : this._logService.consoleLog(`No Mapbox Access Token Found:\n`, token);
    }

    private async getHexagonLayerData(): Promise<void> {
        try {
            const { HEXAGON_LAYER_DATA_URL } = this._urls;
            const data = await csv(HEXAGON_LAYER_DATA_URL);
            this.setHexagonLayerData(data);
        } catch (err: Error) {
            this._logService.consoleError(`${this.getHexagonLayerData.name} Fetch Failed:\n`, err);
        }
    }

    private setHexagonLayerData(data: DSVRowArray<string>): void {
        data?.length
            ? (this._hexagonLayerData = data.map((d): number[] => [Number(d.lng), Number(d.lat)]))
            : this._logService.consoleLog(`No ${this.getHexagonLayerData.name} Found:\n`, data);
    }

    private async getLayerData(): Promise<void> {
        for (const layer of this._layers) {
            const fc = await this.getGeoJsonFeatureCollection(layer);
            this.setLayer(fc, layer);
        }
    }

    private setLayer(fc: FeatureCollection, layer: ISingleLayer_StaticProps): void {
        fc?.features?.length
            ? this._layerService.setLayer(fc, layer)
            : this._logService.consoleLog(`No ${this.getLayerData.name} Features Found:\n`, fc);
    }

    private async getMarkerData(): Promise<void> {
        for (const marker of this._markers) {
            const { id } = marker;
            const { features } = await this.getGeoJsonFeatureCollection(marker);
            this.setMarkers(id, features);
        }
    }

    private setMarkers(id: string, features: Feature[]): void {
        features?.length
            ? this._markerService.setMarkers(id, features)
            : this._logService.consoleLog(`No ${this.getMarkerData.name} Features Found:\n`, features);
    }

    private async getGeoJsonFeatureCollection({
        id,
        fields
    }: ISingleLayer_StaticProps | IMarker_StaticProps): Promise<FeatureCollection> {
        const { GEOJSON_ENDPOINT } = this._endPoints;
        const params: IHttpParams = { fields, table: id.replace(/-(.*)$/, '') };
        const { data } = <IHttpResponse<FeatureCollection>>await this.httpGetRequest(GEOJSON_ENDPOINT, params);
        return data;
    }

    private async httpGetRequest(url: string, params?: IHttpParams): Promise<AxiosResponse | void> {
        try {
            return await this._httpService.getRequest(url, { params });
        } catch (err: Error) {
            this._logService.consoleError(`HTTP GET ${url} Request Failed:\n`, err);
        }
    }
}
