package app

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strings"

	"gitlab.com/geospatialweb/go-vue3/collection"
)

type token struct {
	Token string `json:"token"`
}

func (a *App) GetGeoJsonFeatureCollection(w http.ResponseWriter, r *http.Request) {
	printHttpRequest(r.Method, r.RequestURI)
	params, err := parseUrlQuery(r.URL.RawQuery)
	if err != nil {
		log.Println(err)
	}

	features, err := a.GetGeoJsonFeatures(params)
	if err != nil {
		log.Println(err)
	}

	c := collection.Collection{Features: features}
	fc, err := c.CreateGeoJsonFeatureCollection()
	if err != nil {
		log.Println(err)
	}
	if err := jsonResponse(w, fc); err != nil {
		log.Println(err)
	}
}

func (a *App) GetMapboxAccessToken(w http.ResponseWriter, r *http.Request) {
	printHttpRequest(r.Method, r.RequestURI)
	token := token{a.token}
	if err := jsonResponse(w, token); err != nil {
		log.Println(err)
	}
}

func jsonResponse(w http.ResponseWriter, payload interface{}) error {
	res, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("error JSON marshalling payload:\n%v", err)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
	return nil
}

func parseUrlQuery(q string) (map[string]string, error) {
	m, err := url.ParseQuery(q)
	if err != nil {
		return nil, fmt.Errorf("error parsing url query string:\n%v", err)
	}

	p := make(map[string]string)
	for k := range m {
		p[k] = m[k][0]
	}
	return p, nil
}

func printHttpRequest(s ...string) {
	fmt.Println(strings.Join(s, " "))
}
