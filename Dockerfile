FROM node:22.11.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm run install:all

RUN start:all