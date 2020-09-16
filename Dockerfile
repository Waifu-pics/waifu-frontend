FROM golang:alpine AS gobuilder
WORKDIR /app/server
COPY ./server /app/server
RUN cd /app/server && go build -o goapp

FROM node:lts-alpine AS vuebuilder
WORKDIR /app/client
COPY . .
RUN npm install
RUN npm run build

FROM alpine
WORKDIR /app
COPY --from=gobuilder /app/server/goapp /app
COPY --from=vuebuilder /app/client/dist /app/dist

ENTRYPOINT ./goapp