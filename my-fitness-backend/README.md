# My Fitness Backend

A modular Express backend for the My Fitness platform, currently centered on the authentication domain and designed to support both SQL and NoSQL learning patterns.

## Overview

This project uses:

- Express for the HTTP API
- PostgreSQL for transactional auth and profile storage
- MongoDB for optional document-style persistence and future expansion
- JWT for stateless authentication
- Zod for validation
- Swagger for API docs
- Winston for structured logging
- node-pg-migrate for SQL schema versioning

## Current architecture style

The project follows a layered modular design:

1. Route layer
2. Controller layer
3. Service layer
4. Repository layer
5. Mapper layer
6. Shared middleware and utils

This makes the auth module easy to test, reason about, and extend.

## Project structure

```text
my-fitness-backend/
├── src/
│   ├── app.js
│   ├── index.js
│   ├── config/
│   │   ├── env.config.js
│   │   ├── mongo.config.js
│   │   ├── postgres.config.js
│   │   ├── swagger.config.js
│   │   └── s3.config.js
│   ├── modules/
│   │   ├── auth/
│   │   ├── billing/
│   │   ├── health/
│   │   ├── social/
│   │   └── workout/
│   └── shared/
│       ├── middlewares/
│       ├── logger/
│       └── utils/
├── migrations/
├── docs/
├── package.json
└── .env
```

## Core packages and what they do

### Express
Used to create the API server. Routes and middleware are registered in `src/app.js`.

### PostgreSQL + `pg`
Used for the main auth and profile persistence path. The auth repository uses SQL queries directly against `auth_users` and `user_profiles`.

### MongoDB + `mongoose`
Used as a second database for learning and future document-oriented use cases. The current auth module uses PostgreSQL as the primary storage path.

### JWT + `jsonwebtoken`
Used to sign and verify tokens. Token payload includes:

- `sub` → user id
- `username` → username

### Bcrypt + `bcryptjs`
Used to hash passwords on register and compare them on login.

### Zod
Used for input validation on both requests and environment variables.

### Swagger
Exposes interactive HTML documentation via `/api-docs`.

### Winston
Provides consistent application logging for startup, DB status, errors, and trace events.

### node-pg-migrate
Manages versioned SQL schema changes so the database structure is applied in a controlled way.

## Startup flow

The application boots through `src/index.js`:

1. Loads environment variables from `.env`
2. Connects to MongoDB
3. Validates PostgreSQL connectivity
4. Starts the HTTP server on `PORT`

## Auth module

### Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `PUT /auth/profile`

### Request validation

- `registerSchema` validates username, email, password, and optional profile payload
- `loginSchema` validates username and password
- `profileUpdateSchema` validates partial profile changes

### Security model

Protected endpoints use the Bearer token strategy:

- Login/Register returns a JWT
- Auth middleware reads the token from `Authorization`
- Token is verified using `JWT_SECRET`
- If valid, `req.user` is populated

## Auth flow

### Register

- validates request data
- checks if username or email already exists
- hashes password
- inserts user + profile row in a transaction
- returns public user details and JWT

### Login

- look up user by username
- compare submitted password with stored hash
- return public-safe user and JWT on success

### Get profile

- reads the authenticated user id from the token
- loads their profile from Postgres
- returns safe public profile data

### Update profile

- validates the partial profile payload
- upserts the profile fields into `user_profiles`
- returns the latest public-safe representation

## Database strategy

### PostgreSQL
Primary source of truth for auth and profile data.

Tables used by the auth flow:

- `auth_users`
- `user_profiles`

### MongoDB
Used as a secondary learning database and for future document-oriented features.

## Current strengths

- Clean modular structure
- Layered architecture
- JWT auth
- Input validation with Zod
- Centralized error handling
- Swagger docs
- Database migration support

## Current gaps

- Some modules are still empty scaffolds
- Mongo and Postgres are both present, but the auth path is currently tied to Postgres
- App startup still needs stronger operational hardening for production use
- Health probes and rate limiting should be tuned more explicitly per route

## Run locally

```bash
npm install
npm run migrate:up
npm run dev
```

## Swagger

Open this after starting the server:

```text
http://localhost:5000/api-docs
```

## Notes

This repository is a good example of a learning-first modular server with a practical auth foundation. It is well-structured for growth, but still needs additional production polish before being considered fully hardened for enterprise use.
