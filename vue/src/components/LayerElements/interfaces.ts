import { IAbstractReactiveState, IAbstractStaticState } from '../../common_services/State/interfaces'

export interface ILayerElements {
    biosphere: string
    deckgl: string
    office: string
    places: string
    satellite: string
    trails: string
}

export interface ILayerIconProps {
    alt: string
    height: number
    id: string
    src: string
    width: number
}

export type ILayerVisibility_ReactiveProps extends IAbstractReactiveState

export interface ILayerVisibility_StaticProps extends IAbstractStaticState {
    biosphere: {
        isActive: boolean
    }
    'biosphere-border': {
        isActive: boolean
    }
    trails: {
        isActive: boolean
    }
}
