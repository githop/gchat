#!/bin/bash

docker-compose up -d --build
cd frontend
#npm install
#npm run start
yarn install
yarn start