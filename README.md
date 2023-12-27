# TypeScript API Template
An opinionated template for building a NodeJS/TypeScript API.

## Stack
* NodeJS/TypeScript
* Express
* Express Validator
* Prisma ORM (configured for PostgreSQL)
* Redis
* BullMQ
* Firebase Auth
* Morgan for HTTP logging
* Winston for other logging

## System Requirements
* Docker
* NodeJS
* NVM
* Yarn

## Setup Development
Install Node & Node modules, then set environment variables.
```bash
# Install Node 16
$ nvm install 16

# Use Node 16 in current shell session
$ nvm use

# Install Node modules
$ yarn

# Copy environment variables
$ cp .env.example .env
```
You'll need a **Firebase key** to a development project to begin.

Save this file as `firebase-key.json` in the project directory and set the **full path** of the file as the value for `GOOGLE_APPLICATION_CREDENTIALS` in your `.env` file.
```bash
# Migrate the database schema 
$ yarn db:migrate
```

## Start Development
```bash
# Use correct node version
$ nvm use

# Start the server
$ yarn start
```
