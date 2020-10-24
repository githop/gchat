#!/bin/bash

docker-compose build backend
docker-compose run backend rake db:create db:migrate
cd frontend
#npm install
yarn install