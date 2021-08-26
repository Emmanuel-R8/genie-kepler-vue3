import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces'

//
// Local static image
//
// more structures than needed but hopefully start of a systematic template.
//

// Reactive properties
export interface ILocalStaticImage_ReactiveProps extends IAbstractReactiveState {
    UNUSED: string
}

// Static properties
export interface ILocalStaticImage_StaticProps extends IAbstractStaticState {
    filename: string
}

// Static options.
// export type ILocalStaticImage_Settings = ILocalStaticImage_StaticProps

// What it says on the tin.
// export interface ILocalStaticImage_ReactiveProps {}
