FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY swagger.config.js .
COPY postgres-init/ ./postgres-init/
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY ./src ./src
EXPOSE 3000
CMD ["node", "src/server.js"]