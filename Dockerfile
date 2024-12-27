FROM node:22.11.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run install:all

EXPOSE 5173 3000

CMD [ "npm", "run", "start:all" ]