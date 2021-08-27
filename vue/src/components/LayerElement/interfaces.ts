import { FeatureCollection } from 'geojson';

import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces';
import { IMarker_StaticProps } from '../Marker/interfaces';

export interface ISingleLayer_ReactiveProps extends IAbstractReactiveState {
    id: string;
    name: string;
    src: string;
    height: number;
    width: number;
    isActive: boolean;
}

export interface ISingleLayer_StaticProps extends IMarker_StaticProps, IAbstractStaticState {
    // id and fields are provided by IMearker
    // id: string
    // fields: string
    type: string;
    source: {
        type: string;
        data: Record<string, never> | FeatureCollection;
    };
    layout: {
        visibility: string;
    };
    paint: {
        'fill-color'?: string;
        'fill-opacity'?: number;
        'fill-outline-color'?: string;
        'line-color'?: string;
        'line-width'?: number;
    };
}

export interface ILayerVisibility_ReactiveProps extends IAbstractReactiveState {
    id: string;
    isActive: boolean;
    name: string;
}

export interface ILayerVisibility_StaticProps extends IAbstractStaticState {
    biosphere: {
        isActive: boolean;
    };
    'biosphere-border': {
        isActive: boolean;
    };
    trails: {
        isActive: boolean;
    };
}
