FROM node:16-alpine as base

COPY package.json .

RUN npm install

RUN mkdir /app

WORKDIR /app

COPY . .

WORKDIR /app/jsdoc

RUN ["git", "clone", "https://github.com/clenemt/docdash.git"]

WORKDIR /app

RUN npm run generate-docs

CMD ["node", "index.js"]