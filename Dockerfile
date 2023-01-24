FROM node:14.17 AS builder
RUN apt-get update && apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y
RUN Xvfb :99 &
RUN export DISPLAY=:99
COPY ./src /root/src
WORKDIR /root/src
RUN npm ci --only=production
RUN npm run build


# COPY ./vscode-server-bin /root/.vscode-server/bin

FROM nginx:latest AS careerdive-frontend
COPY --from=builder /root/src/build /src/build
COPY ./deploy/front-nginx/front.conf \
    /etc/nginx/conf.d/default.conf