Q1 :

contenu du Dockerfile : 

FROM node:19


commandes à effectuer : 

pour se connecter dans le container :
docker run -it -v ${PWD}:/app "nom de l'image" /bin/bash

une fois dans le container : 

cd app/

npm install

npm run sass-compile



Q2 :

contenu du dockerfile : 
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
