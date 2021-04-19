package app

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v4/pgxpool"
)

type App struct {
	pool   *pgxpool.Pool
	router *mux.Router
	token  string
	uri    string
}

func (a *App) InitializeApp(token, uri string) {
	a.router = mux.NewRouter()
	a.token = token
	a.uri = uri
	a.handleRoutes()
}

func (a *App) handleRoutes() {
	api := a.router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/geojson", a.GetGeoJsonFeatureCollection).Methods("GET")
	api.HandleFunc("/mapbox-access-token", a.GetMapboxAccessToken).Methods("GET")
	api.Use(mux.CORSMethodMiddleware(api))
}

func (a *App) poolConnect() {
	var err error
	ctx := context.Background()
	a.pool, err = pgxpool.Connect(ctx, a.uri)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("PostgreSQL pool connected")
}

func (a *App) RunApp(host, addr string) {
	l, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Http server listening at %s%s\n", host, addr)
	if err = http.Serve(l, a.router); err != nil {
		log.Fatal(err)
	}
}
