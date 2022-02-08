#!/bin/bash

yarn install && yarn build

docker image rm -f app/admin
docker build . -t app/admin