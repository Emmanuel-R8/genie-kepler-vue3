#!/usr/bin/sh

# Get environment variables defining POSTGRES_DBNAME, POSTGRES_USER, POSTGRES_PASS and MAPBOX_ACCESS_TOKEN
# From a file ignored by .gitignore
#
# `env.template` details the expected variables.
source ./.env

# No need to build. Compose will do it
# docker build .

docker-compose up

