#!/usr/bin/env bash

NAME="ts-api-template-redis"
VERSION="7-alpine"

docker run -d --name "${NAME}" \
  -p 6379:6379 \
  "redis:${VERSION}"
