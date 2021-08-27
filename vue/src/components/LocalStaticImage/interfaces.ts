import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces';

// Reactive properties
export interface ILocalStaticImage_ReactiveProps extends IAbstractReactiveState {
    UNUSED: string;
}

// Static properties
export interface ILocalStaticImage_StaticProps extends IAbstractStaticState {
    filename: string;
}
