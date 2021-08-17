#!/usr/bin/env sh
export POSTGRES_DBNAME="genie-kepler-vue3"
export POSTGRES_USER="generic_user"
export POSTGRES_PASS=""

. docker-compose up

