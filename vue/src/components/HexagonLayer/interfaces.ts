import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces';
export interface IHexagonLayer_ReactiveProps extends IAbstractReactiveState {
    coverage: number;
    elevationScale: number;
    radius: number;
    upperPercentile: number;
}

export interface IHexagonLayer_StaticProps extends IAbstractStaticState {
    colorRange: number[][];
    elevationRange: number[];
    extruded: boolean;
    id: string;
    material: {
        ambient: number;
        diffuse: number;
        shininess: number;
        specularColor: number[];
    };
    pickable: boolean;
    transitions: {
        coverage: number;
        elevationScale: number;
    };
}
