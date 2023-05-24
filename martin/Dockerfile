FROM node:16-alpine

COPY package.json .

RUN npm install

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm run generate-docs

RUN npm run test

EXPOSE 8090

CMD ["node", "index.js"]