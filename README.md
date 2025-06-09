# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker desktop - [Download page](https://www.docker.com/products/docker-desktop/)

## Installation process

1. Clone the repository:
   `git clone https://github.com/KuzmakD/nodejs2024Q3-service.git/tree/part2`
2. Install all npm modules `npm install`
3. Create the .env file using [example](.env.example);

## How to RUN using Docker

### Running with Docker

1. Install and run [Docker](https://docs.docker.com/engine/install/)
2. Log in and launch the Docker Desktop application.
3. Execute command `docker-compose up --build` or commands `docker-compose build` and `docker-compose up` sequentially.

\_Note: Restarting Nest when code changes take about 1 minute

### Running without Docker

_If you haven't encountered any issues with Docker, you can skip this step_

1. Install [Postgres](https://www.postgresql.org/download/)
2. Create a database with name `rss_node_service` (use PostgreSQL 16).
3. Apply migrations `npm run migration:update`
4. Start the server `npm start`

## Checks for Docker

- The images take up 496MB (application 257MB, PostgreSQL 239MB)) `docker image ls`
- Application image on [hub.docker](https://hub.docker.com/repositories/kuzmak)
- You can initiate the scanning `npm run docker:scan`

---

## Testing

After application running open new terminal and enter:
To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
