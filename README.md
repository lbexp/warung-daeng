# Warung daeng app

This project is served as a take home test assignment. This project has 2 services, the backend API service and the web client application service.

## Requirements

### Backend API

- NPM 10.7.0
- Node.js v18.20.4
- PostgreSQL

### Web Client App

- NPM 10.7.0
- Node.js v18.20.4

## How to Run Locally

In order to run this app, we need both the API and client app to be started.

### Backend

- Go to the `/api` file path
- Install node modules

```bash
npm install
```

- Make sure you have installed db-migrate and db-migrate-pg via npm globally

```bash
npm install -g db-migrate db-migrate-pg
```

- Setup env variables via .env file

```bash
cp .env.example .env
```

- Make sure the variables are filled like this

```
NODE_ENV=dev
DB_USERNAME=dummy_username
DB_PASSWORD=dummy_password
DB_NAME=dummy_database
DB_HOST=localhost
DB_PORT=5432
DB_SSL=false
JWT_SECRET=123456
BCRYPT_SALT=8
```

- Go to the /api file path and run the migration up command

```bash
db-migrate up
```

- API service now can be started using this command

```bash
npm run start:dev
```

### Frontend

- Go to the `/client` file path
- Install node modules

```bash
npm install
```

- Make sure the app will be served on port other than 3000 (since API service will be using it)
- Run the app with this command

```bash
npm run dev
```

## Tech stack

### Backend API

- NestJS
- PostgreSQL
- db-migrate

### Web Client App

- VueJS
- Pinia
