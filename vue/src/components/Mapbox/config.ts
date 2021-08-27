export const mapbox_Config = {
    reactiveProps: {
        container: 'mapbox',
        doubleClickZoom: false,
        maxZoom: 18,
        minZoom: 2
    },

    staticProps: {
        bearing: 0,
        center: { lng: -76.3, lat: 44.5 },
        pitch: 0,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        zoom: 9.75
    },

    navigationControl: {
        position: 'top-left',
        visualizePitch: true
    },

    options: {},

    skyLayer: {
        id: 'sky',
        type: 'sky',
        paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 25
        }
    }
}

export const mapStyles_Config = {
    reactiveProps: {
        USUSED: ''
    },

    staticProps: [
        {
            isActive: true,
            url: 'mapbox://styles/mapbox/outdoors-v11'
        },
        {
            isActive: false,
            url: 'mapbox://styles/mapbox/satellite-v9'
        }
    ]
}
