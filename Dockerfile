# Docker Image
FROM node:current-alpine3.16

RUN apk add --no-cache tzdata && cp -r -f /usr/share/zoneinfo/Asia/Jakarta /etc/localtime
RUN apk add git

WORKDIR /home/node

COPY ./app.mjs /home/node

RUN npm install -g nodemon

# Start apps
CMD ["nodemon", "app.mjs"]

#EXPOSE PORT
EXPOSE 3000