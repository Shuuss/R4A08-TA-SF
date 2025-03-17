FROM node:19 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run sass-compile

RUN rm -rf node_modules

FROM node:19 AS final

WORKDIR /app

COPY --from=builder /app /app
