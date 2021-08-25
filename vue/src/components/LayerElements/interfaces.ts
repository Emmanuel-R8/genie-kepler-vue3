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

export interface ILayerVisibility {
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
