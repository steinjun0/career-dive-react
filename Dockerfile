FROM node:14.17 AS builder
COPY ./src /root/src
WORKDIR /root/src
RUN npm i --only=production
RUN npm run build

FROM nginx:latest AS careerdive-frontend
COPY --from=builder ./src/build /src/build
COPY ./deploy/front-nginx/front.conf \
    /etc/nginx/conf.d/default.conf