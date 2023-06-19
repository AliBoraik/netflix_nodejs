# NetFlexAdmin

NetFlexAdmin is an application that provides administrative functionalities for managing users, content, and subscriptions in a streaming platform.

## Installation

```bash
$ npm install
```

## Migrations

```bash
$ db-migrate up initialize
```

## Running the app
```bash
$ npm start
```

## Configuration

Before running the application, make sure to set up the required environment variables. Create a .env file in the root directory and provide the following variables:

DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret

Replace your_database_url with the URL of your database and your_jwt_secret with a secret key for JSON Web Token (JWT) encryption.

## Routes

The application provides the following routes:

### Authentication (Auth)

- POST /auth/registration: Register a new user.
- POST /auth/login: Log in with a user's credentials.
- POST /auth/block: Block a user.
- POST /auth/unblock: Unblock a user.
- GET /auth/auth: Get the authenticated user's details.

### Roles

- POST /roles/createRole: Create a new role.
- POST /roles/removeRole: Remove a role.
- POST /roles/assignRole: Assign a role to a user.
- GET /roles/all: Get all roles.
- GET /roles/getRole: Get a specific role by ID.

### Series

- POST /series/addSerial: Add a new series.
- POST /series/deleteSerial: Delete a series.
- POST /series/updateSerial: Update a series.
- GET /series/all: Get all series.

### Films

- POST /films/addFilm: Add a new film.
- POST /films/deleteFilm: Delete a film.
- POST /films/updateFilm: Update a film.
- GET /films/all: Get all films.
### Users

- Routes for user-related operations are defined in the /user router.

### Genres

- Routes for genre-related operations are defined in the /genre router.

### Reviews

- Routes for review-related operations are defined in the /review router.

### Episodes

- Routes for episode-related operations are defined in the /episodes router.

### Subscriptions

- Routes for subscription-related operations are defined in the /subscription router.


