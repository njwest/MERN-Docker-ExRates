# #### For Development - macOS  ####

# Development build and serve commands
# Uncomment below to build and serve for development:

FROM node:8.9.1-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm i -g nodemon

CMD [ "npm", "run", "dev" ]

# #### For Production - Ubuntu 16.04 ####

# UBUNTU Production build and serve commands
# Uncomment below to build and serve for production:

# FROM node:8.9.1-alpine
# COPY . .
# RUN yarn install
#
# CMD [ "npm", "start" ]
