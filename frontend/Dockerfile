FROM node:14
RUN mkdir -p /myapp/frontend
WORKDIR /myapp/frontend
COPY package.json /myapp/frontend
COPY yarn.lock /myapp/frontend
RUN yarn install
COPY . ./myapp/frontend

