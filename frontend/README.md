# Frontend with React

This React app was bootstrapped with the [Create React App](https://github.com/facebookincubator/create-react-app) CLI and manually dockerized.

This app uses custom CSS and the [**Bulma CSS**](https://bulma.io/) framework.

For environment and build information, see the [Dockerfile](#dockerfile) section below.

### Table of Contents

+ [Dependencies](#dependencies)
+ [App Structure](#app-structure)
  + [Folder Structure](#folder-structure)
+ [Dockerfile](#dockerfile)
 + [Node and Linux Versions](#node-and-linux-versions)
 + [Production vs Development](#production-vs-development)


## Dependencies

+ [**React v16.2**](https://github.com/facebook/react) JS UI library (`react` + `react-dom`).
  + [**React Scripts v1.0.17**] for `create-react-app` build scripts. (`react-scripts`)
+ [**React Router v4 - DOM**](https://github.com/ReactTraining/react-router) for routing (`react-router-dom`).
+ [**Axios**](https://github.com/axios/axios) for Promise-based `GET` requests. (`axios`).
+ [**Socket.io-Client**](https://github.com/socketio/socket.io-client) for subscribing to Socket.io feeds (`socket.io-client`).
+ [**MomentJS**](https://github.com/moment/moment/) for converting JS timestamps to legible strings.


## App Structure

+ App is rendered from `src/index.js`.
+ App's **root component** lives in `src/App.js`.
+ **Major components** live within `src/components`.
+ **Common components** live in `src/components/common` and are aggregated and exported from `common/index.js` for easy importing.
+ `GET` **service functions** live in `/src/services`

### Folder Structure

```
frontend/
  public/
    index.html
    manifest.json
  src/
    components/
      Converter.js
      Historic.js
      RealtimeRates.js
      common/
        ExchangeTable.js
        Option.js
        Row.js
        Title.js
        index.js
      layout/
        Footer.js
        Header.js
        Navbar.js
        index.js
    services/
      ExRateService.js
    App.css
    App.js
    App.test.js
    index.css
    index.js
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

In **Development**, the frontend `Dockerfile` serves the app's default development build with `CMD [ "npm", "start" ]`:

```dockerfile
FROM node:8.9.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]
```

In **Production**, the frontend `Dockerfile` uses `yarn` to build the React app `as build` in the `/build` working directory, then serves an optimized production build `as release` from the `build` working directory with `yarn` and `CMD [ "serve", "-s", "build" ]`:

```dockerfile
FROM node:8.5.0-alpine as build
COPY . .
RUN yarn
RUN yarn build

FROM node:8.5.0-alpine as release
COPY --from=build /build ./build
RUN yarn global add serve
EXPOSE 5000
CMD [ "serve", "-s", "build" ]
```

[**Back to Repo Home**](https://github.com/njwest/MERN-Docker-ExRates)
