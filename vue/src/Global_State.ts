//
// The global state is defined as a record of the states of the individual components
//

// This will act as a record of all the individual states and is managed by state `State_Common_Service`
// Some states are reactive / some are not.

// Here we have many more states than actually needed - but everything is listed for sake of being systematic
export enum States {
    //
    // Reactive states
    //
    DECKGL_VIEW_REACTIVESTATE = 'deckglView_ReactiveState',
    HEXAGON_LAYER_REACTIVESTATE = 'hexagonLayer_ReactiveState',
    LAYER_ELEMENTS_REACTIVESTATE = 'layerElements_ReactiveState',
    LAYER_VISIBILITY_REACTIVESTATE = 'layerVisibilty_ReactiveState',
    MAP_STYLES_REACTIVESTATE = 'mapStyles_ReactiveState',
    MAPBOX_VIEW_REACTIVESTATE = 'mapboxView_ReactiveState',
    MODAL_REACTIVESTATE = 'modal_ReactiveState',

    LOCAL_STATIC_IMAGE_REACTIVESTATE = 'localStaticImage_ReactiveState',

    //
    // Static states
    //
    DECKGL_VIEW_STATICSTATE = 'deckglView_StaticState',
    HEXAGON_LAYER_STATICSTATE = 'hexagonLayer_StaticState',
    LAYER_ELEMENTS_STATICSTATE = 'layerElements_StaticState',
    LAYER_VISIBILITY_STATICSTATE = 'layerVisibilty_StaticState',
    MAP_STYLES_STATICSTATE = 'mapStyles_StaticState',
    MAPBOX_VIEW_STATICSTATE = 'mapboxView_StaticState',
    MODAL_STATICSTATE = 'modal_StaticState',

    LOCAL_STATIC_IMAGE_STATICSTATE = 'localStaticImage_StaticState'

    // TEMPLATE
    // TEMPLATE_REACTIVESTATE = 'template_ReactiveState',
    // TEMPLATE_STATICSTATE = 'template_StaticState',
}
