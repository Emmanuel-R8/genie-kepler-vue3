abstract class IAbstractState {}
export abstract class IAbstractReactiveState extends IAbstractState {}
export abstract class IAbstractStaticState extends IAbstractState {}

//
// THIS IS NOW REDUNDANT BECAUSE OF THE ABSTRACT INTERFACES
//
// import { IDeckgl_StaticProps,  } from '../../components/Deckgl/interfaces'
// import { IHexagonLayer_ReactiveProps } from '../../components/HexagonLayer/interfaces'
// import { ILayerElement_ReactiveProps } from '../../components/LayerElement/interfaces'
// import { ILayerVisibility_StaticProps } from '../../components/LayerElements/interfaces'
// import { IMapStyle, IMapbox_StaticProps } from '../../components/Mapbox/interfaces'
// import { IModal_ReactiveProps } from '../../components/Modal/interfaces'

// export type ReactiveState = IHexagonLayer_ReactiveProps | ILayerElement_ReactiveProps[] | IModal_ReactiveProps
// export type StaticState = IDeckgl_StaticProps | ILayerVisibility_StaticProps | IMapStyle[] | IMapbox_StaticProps
