# Example of a fullstack application with a form with validation.


**Table of contents**
1. [Overview](#overview)
2. [Backend](#backend)
3. [Frontend](#frontend)
4. [Installation](#installation)
5. [Running](#running)
6. [Docker](#docker)


## Overview

The application consists of two main parts: backend written in express.js library and frontend written in React library. Each of them is autonomous service that works independently.

The root directory (where this ReadMe is stored) keeps some shareable configs that are useful for those services. In order to keep the services unaware of the context the links to these config files are environment variables. So that it is possible to use these services as docker containers gathered together by docker compose.

The services are written in TypeScript language. Their source code is accompanied by comments, so feel free to read them to understand the purpose of a particular module or a component.


## Backend

The server side part of the application is written in express.js and developed with MVC architectural pattern in mind. API endpoints are built on top of the `express.Router` functionality so that they are divided into domains. Mongo db is choosen as a persistent storage.


## Frontend

The client side part of the application is written in React and utilizes [*Feature Sliced Design*](https://feature-sliced.design/) approach to the code organization. Every component is built with shareability and extendability in mind, so that it can serve as a base for another component or be embedded into a more complex component through composition. The business logic is separated from the UI into service classes and utility functions to allow it to be painlessly reused across the application. Form fields have validation.

In order to keep things simpler it has been decided not to use any state manager, so that global state is provided by the `React.Context`s.

For styling purposes a preprocessor `Sass` and CSS-modules library are used. Although for simplicity the styles are minimal.

As a bundler `webpack` is used. It is configured with the cache-boosting technique in mind.


## Installation

**For the application to work you have to have `mongodb` service running. Check the installation docs for your OS.**  
**This is not needed if you've decided to use containerized version of this application. See [Docker](#docker) section**.


Installation of dependencies of the services can be done globally or on the per-service basis.

In order to install *all the dependencies* run this command while you are **inside the root directory**:

```bash
npm run install:deps
```

If you want dependencies to be installed for the particular service, run this **inside the service directory**:

```bash
npm install
```


## Running

To start a service run this **inside the root directory**:

```bash
npm start:backend
```

for the backend service, or this:

```bash
npm start:frontend
```

for the frontend service.

A particular service can be started by a standard

```bash
npm start
```

command executed **inside the service directory** (note env variables inside the package.json file of a service).


## Docker

In order to get the services containerized run this command:

```bash
docker compose up --build
```

It will build a docker container for each service and compose them together. Open it with the browser by following the URL specified in the `.env` file. By default for production `http://localhost:8181/` is used.


**Containers use their own subnets and are isolated from host. For it to work the host's firewall settings must not conflict with those set by docker. If you are experiencing problems, try using host's network by executing this command instead of the previous one:**

```bash
docker compose -f docker-compose.yml -f docker-compose.host-network.yml up --build
```

**Then navigate to `http://localhost:8181/` as usual.**
