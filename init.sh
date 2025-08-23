#!/bin/sh
set -e

mkdir -p tesla-proxy/config frontend/public/.well-known/appspecific

openssl req -x509 -newkey rsa:2048 -nodes -days 365 \
  -keyout tesla-proxy/config/tls-key.pem \
  -out tesla-proxy/config/tls-cert.pem \
  -subj "/CN=tesla-proxy" \
  -addext "subjectAltName=DNS:tesla-proxy,DNS:localhost,IP:127.0.0.1"
