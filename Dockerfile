# Estágio 1: Build - Instala as dependências
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Estágio 2: Production - Copia os arquivos e roda a aplicação
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY ./src ./src
EXPOSE 3000
CMD [ "npm", "run", "dev" ]