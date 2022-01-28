#!/bin/bash

cd src && yarn install && yarn build
cd ..

docker image rm -f app/admin
docker build . -t app/admin