# A Sample Web Application

## Overview

It is a simple web application which is intended to use it for demonstration purposes and composed of other three services like Web UI, App Server and Database.

### 1. Web App

It contains only static files to be hosted on any web server such as Nginx, Apache2, etc

### 2. App/API Server

It handles the REST API requests such as GET,POST, PUT, DELETE, etc from the Web App or any REST API client. These request operations will be reflected on Database Server.

### 3. Database Server

The Database Server stores, updates, deletes and allows to fetch via the API Server. Ofcouse, we can connect from Database CLI tool. The Database Server used in this app is PostgreSQL.

## Setup and Run for local development/testing

1. Run PostgreSQL Server as container

   ```shell
   docker run --name postgresdb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:13.0
   ```

2. Connect to PostgreSQL server

   ```shell
   PGPASSWORD=password psql -h localhost -U postgres -d mydb
   ```

3. Run required `SQL` commands for application server to start smoothly.

   ```psql
   CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR(20) NOT NULL, email VARCHAR(40) NOT NULL);
   INSERT INTO users(name, email) VALUES('Nagababu Medicharla', 'nagababu.medicharla@searce.com');
   INSERT INTO users(name, email) VALUES('Ganesh Kaila', 'ganesh.kaila@searce.com');
   ```

4. Exit out of the `psql` terminal

   ```psql
   # exit
   ```

## Run Simple App Server

1. Make sure to be in `simple-app-server` directory

   ```shell
   cd simple-app-server/
   ```

2. Build the application server in docker container

   ```shell
   docker build --no-cache -t ganeshkaila/simple-app-server:v0.1 .
   ```

3. Push docker image to the respective container registry

   ```shell
   docker push ganeshkaila/simple-app-server:v0.1
   ```

4. Run the application server as docker container

   ```shell
   docker run -p 8082:8082 -e APP_PORT=8082 -e WEB_SERVER_HOST="http://localhost:8080" -e POSTGRES_USER="postgres" -e POSTGRES_HOST="localhost" -e POSTGRES_PASSWORD="password" -e POSTGRES_DB="mydb" -e POSTGRES_PORT=5432 -d ganeshkaila/simple-app-server:v0.1
   ```

## Run Simple Web UI

1. Make sure to be in `simple-web-ui` directory

   ```shell
   cd simple-web-ui/
   ```

2. Build the application server in docker container

   ```shell
   docker build --no-cache -t ganeshkaila/simple-web-ui:v0.1 .
   ```

3. Push docker image to the respective container registry

   ```shell
   docker push ganeshkaila/simple-web-ui:v0.1
   ```

4. Run the application server as docker container

   ```shell
   docker run -p 8080:80 -e REACT_APP_SIMPLE_APP_SERVER_URL="http://localhost:8082" -d ganeshkaila/simple-web-ui:v0.1
   ```

## Note

1. Apple MacBook with M1 chip users are advised to use flag `--platform linux/amd64` along with `docker build` command. For example,

   ```shell
   docker build --no-cache -t ganeshkaila/simple-web-ui:v0.1 . --platform linux/amd64
   ```
