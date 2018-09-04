FROM node:alpine

LABEL version="v1.0"
LABEL description="aikido-technique-service"

COPY server.js .
COPY ./api ./api
COPY package.json .
COPY package-lock.json .

RUN npm install

CMD ["node", "server.js"]