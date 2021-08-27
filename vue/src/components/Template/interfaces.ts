import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces';

//
// At a minimum the ITemplate_ReactiveProps and ITemplate_StaticProps interfaces are required.
// They are expected in `src/common_services/state.ts`.

//
// Props are always reactive in Vue 3
//
export interface ITemplate_ReactiveProps extends IAbstractReactiveState {
    UNUSED: string;
}

//
// Non reactive static properties set by config
//
export interface ITemplate_StaticProps extends IAbstractStaticState {
    UNUSED: string;
}
