export default [
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
]
