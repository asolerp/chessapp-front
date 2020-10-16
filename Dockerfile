# Dockerfile for client

# Stage 1: Build react client
FROM node:current-alpine

# Working directory be app
WORKDIR /app/client

COPY package*.json ./

# Install dependencies
RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]