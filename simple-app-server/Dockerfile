FROM node:14.18.0-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

ENV APP_PORT=8081
ENV POSTGRES_USER="postgres"
ENV POSTGRES_HOST="localhost"
ENV POSTGRES_DB="mydb"
ENV POSTGRES_PASSWORD="password"
ENV POSTGRES_PORT=5432
ENV WEB_SERVER_HOST="http://localhost:8080"

EXPOSE ${APP_PORT}
CMD [ "npm", "start" ]
