#!/usr/bin/env bash

NAME="ts-api-template-pg"
VERSION="16"
DB_NAME="my_api_db"
DB_USER="api"
DB_PASSWORD="mysecretpassword"

docker run -d --name "${NAME}" \
  -p 5432:5432 \
  -e "POSTGRES_PASSWORD=${DB_PASSWORD}" \
  -e "POSTGRES_USER=${DB_USER}" \
  -e "POSTGRES_DB=${DB_NAME}" \
  "postgres:${VERSION}"
