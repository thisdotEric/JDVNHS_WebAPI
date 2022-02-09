# Stage 1, Build the code
FROM node:16-alpine as builder

WORKDIR /app

CMD echo 100