FROM node:16-alpine

COPY package.json .

RUN npm install

RUN mkdir /app

WORKDIR /app

RUN npm run generate-docs

COPY . .

EXPOSE 8090

CMD ["node", "index.js"]