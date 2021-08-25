export const deckgl_Config = {
    options: {
        canvas: 'hexagon-layer',
        container: 'deckgl',
        controller: true,
        id: 'hexagon-layer',
        interactive: false,
        maxPitch: 80,
        maxZoom: 12,
        minZoom: 5,
        style: 'mapbox://styles/mapbox/dark-v10'
    },

    settings: {
        bearing: -30,
        center: { lng: -3.0, lat: 53.0 },
        latitude: 53.0,
        longitude: -3.0,
        pitch: 50,
        zoom: 6.5
    },

    skyLayer: {
        id: 'sky',
        type: 'sky',
        paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 0
        }
    }
}
