import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces'

// //
// // more structures than needed but hopefully start of a systematic template.
// //

// Reactive properties
export interface ILocalStaticImage_ReactiveProps extends IAbstractReactiveState {
    UNUSED: string
}

export type ILocalStaticImage_StaticProps = IAbstractStaticState

// // Static options.
// export type ILocalStaticImage_Settings = ILocalStaticImage_StaticProps

// // What it says on the tin.
// export interface ILocalStaticImage_ReactiveProps {}
