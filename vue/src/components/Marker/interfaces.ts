export interface IMarker {
    fields: string
    id: string
}

export interface IHTMLMarkerElement extends HTMLDivElement {
    isActive: boolean
    isHidden: boolean
}
