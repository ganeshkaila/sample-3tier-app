FROM node:14.18.0-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

# Copy required files
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx-default.conf.template /tmp/nginx-default.conf.template
COPY docker-entrypoint.sh /

# Required environment variables
# ENV NGINX_BACKEND_1_HOST="localhost"
# ENV NGINX_BACKEND_1_PORT="8081"
# ENV NGINX_HOST="localhost"
# ENV NGINX_PORT="8080"

# Make entrypoint.sh as executable
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

