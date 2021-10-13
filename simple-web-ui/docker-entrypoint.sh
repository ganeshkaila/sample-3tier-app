#!/usr/bin/env sh
set -eu
envsubst '${NGINX_HOST}${NGINX_PORT}${NGINX_BACKEND_1_HOST}${NGINX_BACKEND_1_PORT}' < /tmp/nginx-default.conf.template > /etc/nginx/conf.d/default.conf
exec "$@"
