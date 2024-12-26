FROM node:22.11.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm run install:all

EXPOSE 3000 3010

CMD [ "npm", "run", "start:all" ]