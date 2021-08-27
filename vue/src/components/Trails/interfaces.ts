import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces';

import { LngLatLike } from 'mapbox-gl';

export interface ITrail {
    center?: LngLatLike;
    name: string;
    zoom?: number;
}
