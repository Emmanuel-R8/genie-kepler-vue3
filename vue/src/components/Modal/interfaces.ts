import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces'

export interface IModal_ReactiveProps extends IAbstractReactiveState {
    isActive: boolean
}

export interface IModal_StaticProps extends IAbstractStaticState {
    UNUSED: string
}
