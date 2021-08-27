import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces';

export interface IMarker_StaticProps extends IAbstractStaticState {
    fields: string;
    id: string;
}

export interface IMarker_ReactiveProps extends HTMLDivElement, IAbstractReactiveState {
    isActive: boolean;
    isHidden: boolean;
}
