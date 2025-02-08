Street Style Store API

Project Overview

This project is a RESTful API built using Node.js and Express, with PostgreSQL as the database. It includes CRUD operations for managing item data, asynchronous file handling for storing metadata, rate limiting middleware, and optional JWT-based authentication.

Features

CRUD Operations with PostgreSQL for item management.

Asynchronous file handling for logging item metadata.

Rate-limiting middleware to control excessive API requests.

Optional JWT-based authentication for secure access.

Installation and Setup

Prerequisites

Node.js installed

PostgreSQL database

Steps to Setup

Clone the repository:

git clone <repository-url>
cd street-style-store-api

Install project dependencies:

npm install

Create a .env file in the project root:

DATABASE_URL=postgres://<your-postgres-connection-string>

Ensure your PostgreSQL database is configured and accessible.

Initialize the database schema:

psql <your_connection_url> -f config/schema.sql

Start the development server:

npx nodemon server.js

API Endpoints

Item Routes

1. Create a New Item

POST: /api/items

Request Body:

{
  "name": "Street Style Shirt",
  "description": "A stylish casual shirt"
}

Response:

{
  "message": "Item created successfully"
}

2. Retrieve All Items

GET: /api/items

Response:

[
  {
    "id": 1,
    "name": "Street Style Shirt",
    "description": "A stylish casual shirt",
    "created_at": "2023-02-08T10:00:00.000Z"
  }
]

3. Retrieve an Item by ID

GET: /api/items/:id

4. Update an Item

PUT: /api/items/:id

Request Body:

{
  "name": "Updated Shirt",
  "description": "Updated stylish description"
}

5. Delete an Item

DELETE: /api/items/:id

Rate Limiting

Users are limited to 100 requests per 15 minutes.

If the limit is exceeded, a 429 Too Many Requests error is returned.

Asynchronous File Handling

Metadata (such as timestamps) for each created item is logged in logs/logs.json.

File operations are handled using the fs.promises module.

Optional Authentication (JWT)

Login: /api/login

Provides a JWT token for secure access.

Protected Routes: All item routes can be protected by JWT authentication.

Database Schema

Items Table

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Error Handling

Invalid user inputs

API rate limits

Database connection errors

File operation errors