package collection

import (
	"fmt"

	geojson "github.com/paulmach/go.geojson"
)

type Collection struct {
	Features []*Feature
}

type Feature struct {
	Feature string
}

func (c *Collection) CreateGeoJsonFeatureCollection() (*geojson.FeatureCollection, error) {
	fc := geojson.NewFeatureCollection()
	for _, f := range c.Features {
		f, err := geojson.UnmarshalFeature([]byte(f.Feature))
		if err != nil {
			return nil, fmt.Errorf("error unmarshalling Feature:\n%v", err)
		}
		fc.AddFeature(f)
	}
	return fc, nil
}
