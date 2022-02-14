# Stage 1, Build the code
FROM node:16-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./

# Install ALL the dependencies of the server and webapp 
RUN yarn install --frozen-lockfile

COPY . ./

# Build the server
RUN yarn build 

# Stage 2, create the production image
FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY  ./.env.prod ./.env

COPY --from=builder /app/dist ./dist

RUN yarn install --production --frozen-lockfile

EXPOSE 4000
CMD node dist/server.js