# Auth Module

This module provides registration, login, profile management, and JWT-based authentication for the My-Fitness backend.

## Core Features
- register with username and password
- login and issue JWT
- load current user profile
- update profile info
- support premium flag

## Endpoints
- POST /auth/register
- POST /auth/login
- GET /auth/me
- PUT /auth/profile

## Notes
- Passwords are stored as bcrypt hashes.
- use JWT access tokens
- protect all user-specific routes with auth middleware
- MongoDB stores the application user document.
- PostgreSQL is initialized for future billing and auth-related relational needs.

## Core Fields
- username
- email
- passwordHash
- profile:
    height
    weight
    age
    gender
    goal
    activityLevel
- isPremium
- privacySettings
