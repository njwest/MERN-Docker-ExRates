# #### For Development - macOS  ####

# Development build and serve commands
# Uncomment below to build and serve for development
# Comment to build and serve from production:

FROM node:8.9.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3000
CMD [ "npm", "start" ]

# #### For Production - Ubuntu 16.04 ####

# UBUNTU Production build and serve commands
# Uncomment below to build and serve for production
# Comment to build and serve from development:

# FROM node:8.5.0-alpine as build
# COPY . .
# RUN yarn
# RUN yarn build
#
# FROM node:8.5.0-alpine as release
# COPY --from=build /build ./build
# RUN yarn global add serve
# EXPOSE 5000
# CMD [ "serve", "-s", "build" ]
