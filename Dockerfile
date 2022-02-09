# Stage 1, Build the code
FROM node:16-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY webapp/package.json webapp/yarn.lock ./webapp/

# Install ALL the dependencies of the server and webapp 
RUN yarn install --frozen-lockfile
RUN yarn --cwd webapp/ install --frozen-lockfile

COPY . ./

# Build the server
RUN yarn build 

# Build the webapp
RUN yarn --cwd webapp/ build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/webapp/package.json ./webapp/package.json
COPY  ./.env ./.env

# Copy the build files of both server and webapp to the docker image
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/webapp/build ./webapp/build

# Install ONLY the dependencies (NOT including devDependencies) of the server and webapp. 
RUN yarn install --production --frozen-lockfile
RUN yarn --cwd ./webapp/ install --production --frozen-lockfile

EXPOSE 4000
CMD node dist/src/server.js