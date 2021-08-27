export const perLayer_Config = {
    staticProps: [
        {
            id: 'biosphere',
            fields: 'name,description,geom',
            type: 'fill',
            source: { type: 'geojson', data: {} },
            layout: { visibility: 'none' },
            paint: {
                'fill-color': '#0A0',
                'fill-opacity': 0.4,
                'fill-outline-color': '#000'
            }
        },
        {
            id: 'biosphere-border',
            fields: 'name,description,geom',
            type: 'line',
            source: { type: 'geojson', data: {} },
            layout: { visibility: 'none' },
            paint: {
                'line-color': '#000',
                'line-width': 1.5
            }
        },
        {
            id: 'trails',
            fields: 'name,description,lat,lng,geom',
            type: 'line',
            source: { type: 'geojson', data: {} },
            layout: { visibility: 'none' },
            paint: {
                'line-color': '#900',
                'line-width': 3
            }
        }
    ],

    reactiveProps: [
        {
            id: '',
            name: '',
            src: '',
            height: 512,
            width: 512,
            isActive: false
        },
        {
            id: '',
            name: '',
            src: '',
            height: 512,
            width: 512,
            isActive: false
        },
        {
            id: '',
            name: '',
            src: '',
            height: 512,
            width: 512,
            isActive: false
        }
    ]
};

export const layerVisibility_Config = {
    reactiveProps: {
        id: '',
        isActive: false,
        name: ''
    },

    staticProps: {
        biosphere: { isActive: true },
        'biosphere-border': { isActive: true },
        trails: { isActive: false }
    }
};
