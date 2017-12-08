# Aftership Challenge: Three-tier Dockerized MERN Exchange Rate App

A multi-container **Docker** app with a React frontend, a Node/Express/mongoDB (the **MERN** stack).

[**Click to Run Demo**](http://128.199.130.212:5000)

Currently deployed to a [**Digital Ocean**](https://www.digitalocean.com) droplet running **Ubuntu 16.04**.


### Table of Contents

+ [Installation Instructions](#installation-instructions)
+ [Three-tier Architecture](#three-tier-architecture)
+ [Dev Decisions](#dev-decisions)
  + [Why Axios?](#why-axios)
  + [Why Docker-compose?](#why-docker-compose)
  + [Why Digital Ocean?](#why-digital-ocean)
+ [Frontend](#frontend)
+ [Backend](#backend)
+ [Potential Improvements](#potential-improvements)


## Installation Instructions
**Prerequisites:**
1. [DockerCE](https://www.docker.com/community-edition)  
2. [docker-compose](https://docs.docker.com/compose/install/)
3. A free-tier Open Exchange Rates API Key (https://openexchangerates.org/)
4. A free-tier Polygon.io API Key (https://polygon.io)

**Clone and Run**
1. `git clone git@github.com:njwest/AftershipExRateChallenge.git [NewAppDir]`
2. `cd [NewAppDir]`
3. Add your Polygon and Open Exchange Rate secrets to the relevant fields in `docker-compose.yaml`
3. `docker-compose build`
4. `docker-compose up`


## Three-tier Architecture

This app was developed with three-tier architecture, as in Frontend<->API Server<->Database.

![App Architecture Diagram](https://github.com/njwest/AftershipExRateChallenge/blob/master/3-tier-diagram.png "App Architecture Diagram")


## Dev Decisions

##### Why Axios

I opted to use **Axios** rather than the native **fetch()** method for API calls in this project, as Axios does not require the `json()` method in order to transfer JSON data, and fetch() does not return errors on `400 - Bad Request` responses.

##### Why Docker-compose

I used **Docker** for this project because Docker containers provide easily configurable, independent Node versions per each container. Docker also provides great **logging** capabilities by default.

I opted to use **docker-compose** to build this app as it creates network relationships between different Docker containers. Docker-compose also provides common environment variables across containers (with V3 specified in docker-compose.yaml).

##### Why Digital Ocean

I deployed this demo to a **Digital Ocean droplet** because said droplets are inexpensive VPSs with static IPs with root access.

To my mind, DO VPSs are ideal for demoing, as building the same demo on a network of AWS or GCP services would cost more time and money for features this demo will not need.


## Frontend

For an overview of the **React frontend**, visit the [**Frontend Readme**](https://github.com/njwest/AftershipExRateChallenge/tree/master/frontend#frontend-with-react)


## Backend

For an overview of the **Node with mongoDB backend**, visit the [**Backend Readme**](https://github.com/njwest/AftershipExRateChallenge/tree/master/backend#backend-with-node-and-mongodb)


## Potential Improvements

1. **Reduxify** the frontend Converter component to add currency names and rates to a shared Redux store, to reduce the need for API calls on component load.
2. Save frontend state to client **Local Storage** so the app works offline.
3. Implement **NGINX** reverse proxy for web server/HTTP management.
4. Add SSL certification for HTTPS.
5. Add real-time chart to the Socket.IO client component.
6. Implement better logic to API/backup comparison of Currency Names object for the Converter.
