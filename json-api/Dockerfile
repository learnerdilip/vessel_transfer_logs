FROM node:22-alpine

WORKDIR /json-api

RUN npm install -g json-server

COPY db.json .

EXPOSE 3000

CMD ["json-server", "--watch", "db.json"]