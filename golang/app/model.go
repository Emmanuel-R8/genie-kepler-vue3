package app

import (
	"context"
	"fmt"

	"github.com/georgysavva/scany/pgxscan"
	"gitlab.com/geospatialweb/go-vue3/collection"
)

func (a *App) GetGeoJsonFeatures(params map[string]string) ([]*collection.Feature, error) {
	ctx := context.Background()
	features := []*collection.Feature{}
	query := fmt.Sprintf(`
		SELECT ST_AsGeoJSON(feature.*) AS feature
		FROM (
			SELECT %s
			FROM %s
		) AS feature`, params["fields"], params["table"])
	a.poolConnect()
	defer a.pool.Close()
	if err := pgxscan.Select(ctx, a.pool, &features, query); err != nil {
		return nil, fmt.Errorf("error executing query:\n%v", err)
	}
	return features, nil
}
