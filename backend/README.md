# Backend with Node and mongoDB

This Node server was coded and dockerized manually.

For environment and build information, see the [Dockerfile](#dockerfile) section below.

### Table of Contents

+ [Dependencies](#dependencies)
+ [Server Structure](#app-structure)
  + [API Implementation](#api-implementation)
    + [RESTful Endpoints](#restful-endpoints)
    + [Socket.IO](#socket.io)
  + [Folder Structure](#folder-structure)
+ [Dockerfile](#dockerfile)
  + [Node and Linux Versions](#node-and-linux-versions)
  +[Production vs Development](#production-vs-development)


## Dependencies

+ [**Express v4.16.2**](https://github.com/expressjs/express) Node web framework (`express`).
 + [**CORS**](https://github.com/expressjs/cors) Express middleware for Cross-Origin Resource Sharing (`cors`).
 + [**body-parser**](https://github.com/expressjs/body-parser) Express middleware for parsing incoming request bodies (`body-parser`).
+ [**Axios**](https://github.com/axios/axios) for Promise-based `GET` requests. (`axios`).
+ [**Mongoose**](https://github.com/Automattic/mongoose) for modeling for and connecting to MongoDB.(`mongoose`).
+ [**Socket.IO**](https://github.com/socketio/socket.io) for publishing real-time data feeds (`socket.io`).
+ [**Nodemon**](https://github.com/remy/nodemon) for hot server code reloading in development. (installed on `docker-compose build` via backend Dockerfile)

## Server Structure

+ The **Express server** is configured and run from `/app.js`.
+ **Static files** are served from `public/`.
+ **Routes** for executing and responding to API requests are in `routes/CurrencyRoutes.js`
+ Helper functions for comparing/backing up currency rates/currency names to **MongoDB** are also stored in `routes/CurrencyRoutes.js`, as there are only two of them.
+ **Schemas/models** for **MongoDB** are stored in `schemas/`.
+ **Socket.io** is configured in App.js rather than in a file in a subdirectory for simplicity's sake.


### API implementation

#### RESTful Endpoints

This backend server's RESTful API endpoints are established in [/routes/CurrencyRoutes.js](https://github.com/njwest/MERN-Docker-ExRates/tree/master/backend/routes/CurrencyRoutes.js).

The base route for these endpoints, '/api/', is established in `app.js`.

+ `/api/allrates`

Retrieve conversion rates from either the OpenExchangeRates API or mongoDB (if the OER API is unavailable)

+ `/api/currencies`

Retrieve a list of available currencies and their full names from either the OpenExchangeRates API or mongoDB (if the OER is unavailable).

+ `/api/historic/:base/:date`

Retrieve historic currency rates for any day since 1999 from the European Central Bank via Fixer.io (fewer currencies available than from OER, but historic API is free).

#### Socket.IO

This backend server's Socket.IO channel, `rate stream`, is published in  [/app.js](https://github.com/njwest/MERN-Docker-ExRatese/tree/master/backend/app.js).

This socket channel serves the latest Bid/Ask quote from the Polygon.io API.

### Folder Structure

```
backend/
  public/
    favicon.ico
  routes/
    CurrencyRoutes.js
  schemas/
    Currency.js
    CurrencyRates.js
  app.js
  README.md
  Dockerfile
  package.json
  yarn.lock
```

## Dockerfile

### Node and Linux Versions

This container uses **Node 8.9.1 (Carbon)** (`node:8.9.1`) as it is the LTS version for Node 8.x.

This container uses **Alpine Linux** (`-alpine`) for the smallest possible build size.

### Production vs Development

In **Development**, the backend `Dockerfile` installs Nodemon, then starts the Node server via Nodemon with `CMD [ "npm", "run", "dev" ]`, which translates to `nodemon app.js`:

```dockerfile
FROM node:8.9.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm i -g nodemon

CMD [ "npm", "run", "dev" ]
```

In **Production (Ubuntu)** , the backend `Dockerfile` uses `yarn install` to install server dependencies, then starts the Node server with `CMD [ "npm", "start" ]`, which translates to `node app.js`:

```dockerfile
FROM node:8.9.1-alpine
COPY . .
RUN yarn install

CMD [ "npm", "start" ]
```

[**Back to Repo Home**](https://github.com/njwest/MERN-Docker-ExRates)
