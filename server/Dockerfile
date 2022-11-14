FROM node:17-alpine

RUN yarn add global nodemon

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", "run", "start:dev"]