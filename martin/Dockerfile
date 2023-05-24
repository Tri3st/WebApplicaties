FROM node:16-alpine as base

COPY package.json .

RUN npm install

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm run generate-docs

RUN npm run test

EXPOSE 8090

FROM base as prod

CMD ["node", "index.js"]

FROM base as test

CMD ["npm", "test"]