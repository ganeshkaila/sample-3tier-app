FROM node:14.18.0-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
ENV REACT_APP_SIMPLE_APP_SERVER_URL=http://localhost:8082
