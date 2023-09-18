FROM node:16-alpine as base

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "index.js"]