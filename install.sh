#!/bin/bash

docker-compose build backend
docker-compse up -d
cd frontend
#npm install
#npm run start
yarn install
yarn start