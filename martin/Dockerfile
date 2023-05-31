FROM node:16-alpine as base

COPY package.json .

RUN npm install

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm run generate-docs

EXPOSE 8090

CMD ["node", "index.js"]