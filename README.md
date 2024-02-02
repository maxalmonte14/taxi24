## Requirements

The project has been tested with the following tools. Please make sure they are available to you (except for Postgres and Postgis that are provided via Docker images).

| Tool     | Version |
| -------- | ------- |
| Node JS  | 20.10.0 |
| NPM      | 10.2.3  |
| Docker   | 25.0.1  |
| Postgres | 16.1    |
| Postgis  | 3.4.1   |
| Ubuntu   | 20.04.6 |

## Instalation

#### Clone the repository

First clone the repo using HTTPS or SSH:

```bash
git clone https://github.com/maxalmonte14/taxi24.git
```

Or

```bash
git clone git@github.com:maxalmonte14/taxi24.git
```

The GitHub CLI can be used if needed too:

```bash
gh repo clone maxalmonte14/taxi24
```

Another option is downloading the source code as a zip file directly from GitHub.

#### Install dependencies

**IMPORTANT:** from this point on I will assume you are located at the root of the project.

Dependencies can be installed by running the following command:

```bash
npm install
```

#### Set environment variables

The `docker-compose.yml` and `DatabaseService` depdend on environment variables therefore they must be provided before running the NestJS and Docker containers.

The following command creates the files `.env` and `.env.test` with empty default values:

```bash
cp .env.example .env && cp .env.test.example .env.test
```

Or in Powershell:

```powershell
Copy-Item ".env.example" ".env"; Copy-Item ".env.test.example" ".env.test"
```

Files `.env` and `.env.test` will look like the following:

```
DATABASE_NAME=
DATABASE_HOST=
DATABASE_PASSWORD=
DATABASE_PORT=
DATABASE_USER=
```

Please populate the files using the values of your choosing. For example:

```
DATABASE_NAME=taxi24
DATABASE_HOST=127.0.0.1
DATABASE_PASSWORD=1234
DATABASE_PORT=9000
DATABASE_USER=postgres
```

**IMPORTANT:** the environment variable `DATABASE_PORT` **can not** be the same in `.env` and `.env.test` because it would cause a conflict when trying to run the Docker containers.

**IMPORTANT:** you can use any port for the value of `DATABASE_PORT` in `.env` and `.env.test`, **except** for *3000* and *65535* which are expected to be used for the application and Adminer respectively.

#### Run the Docker containers

**IMPORTANT:** Docker is only used to provide the database. The NestJS app will run in your host computer.

After setting the environment variables you can run the containers with the following command:

```bash
docker compose up dev-db adminer -d
```

**IMPORTANT:** **Do not** run `docker compose up -d`, this will try to provide the development and test databases at the same time, and since they depend on the same variables it will cause an error because of `DATABASE_PORT` being the same for both services.

This will provide an instance of Postgres with the extension PostGIS already installed, and the database web client Adminer. The Docker image `dev-db` immediately creates the necessary tables and populates them with accurate data by running the script `init.sql`.

**IMPORTANT:** you can connect to Adminer by going to http://127.0.0.1:65535/ and entering the credentials you set in your `.env` and `.env.test` files. The server name for the development and testing databases are `dev-db` and `test-db` respectively.

To create a container for the test database you should run the following command:

```bash
docker compose --env-file ./.env.test up test-db -d
```

#### Run the app

At this point you should be able to start the app by running the following command:

```bash
npm run start
```

## Browsing the endpoints

By going to `http://127.0.0.1:3000/api` you should be able to see the Swagger documentation for the API and test each endpoint by yourself. The documentation also covers every single resource used in the API.

Here is a list of the endpoints included:

### Drivers

- `GET /drivers` - Get all drivers
- `GET /drivers/nearby` - Get all available drivers in a 3 kms radius from the specified coordinates
- `GET /drivers/{id}` - Get the driver with the specified id

### Passengers

- `GET /passengers` - Get all passengers
- `GET /passengers/{id}` - Get the passenger with the specified id
- `GET /passengers/{id}/near-drivers` - Get the three drivers nearest to the passenger's location
- `GET /passengers/{id}/invoices` - Get all invoices belonging to a given passenger

### Rides

- `POST /rides` - Create a ride
- `GET /rides` - Get all rides
- `PATCH /rides` - Update a ride

### Status

- `GET /status` - Get the current status of the application

## Running the tests

The project includes a  number of unit, integration, and end-to-end tests that you can run with the following commands:

```bash
npm run test
```

And

```bash
npm run test:e2e
```

## Design decisions Q&A

### Why isn't an ORM used for this project?

Even though NestJS provides great integration with ORMs like `Sequelize`, `TypeORM`, or `Prisma`, plain SQL queries are perfectly capable of producing reliable data access without the boilerplate needed with ORM integrations.

### Why are the database schemas using snake case while the entities use camel case?

In real-life projects, API resources rarely are a 1 to 1 representation of the database schema, which is a good thing since we should not expose our database structure to third parties. This project was made in a way that resembles the real-life challenges of exposing a structure to third parties while having a different one internally.

### Why delegate business logic to the database?

The distance between two points expressed in latitude and longitude is being calculated directly in Postgres by the `PostGIS` extension, this could be seen as moving the business logic away from the codebase and into the database but I disagree. Since we are using plain SQL queries in the codebase to make these calculations the process should be entirely transparent to the developer. Of course, something like Haversine's formula could have also been used to make the calculations in JavaScript.

### Why isn't the repository pattern used in this project?

The nature of this project is very simple, services don't perform additional tasks besides connecting to the database and fetching or updating data. Adding another layer between the services and controllers would serve no purpose.