package main

import (
	"gitlab.com/AlbaIntelligence/genie-kepler-vue3/app"
	"gitlab.com/AlbaIntelligence/genie-kepler-vue3/env"
)

func main() {
	env.ReadConfigFile()
	a := app.App{}
	a.InitializeApp(env.GetKey("MAPBOX_ACCESS_TOKEN"), env.GetKey("POSTGRES_URI"))
	a.RunApp(env.GetKey("SERVER_HOST"), env.GetKey("SERVER_ADDRESS"))
}
