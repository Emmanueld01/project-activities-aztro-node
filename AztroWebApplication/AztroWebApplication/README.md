# User Management API in C#

This project features a C# API that enables basic CRUD operations for managing users.

## API Endpoints
- **Retrieve Users**
  - `GET /api/user`: Get a list of all users.
  - `GET /api/user/{id}`: Fetch a user by their unique ID.
- **Create a User**
  - `POST /api/user`: Add a new user to the system.
- **Update a User**
  - `PUT /api/user/{id}`: Modify details of an existing user.
- **Delete a User**
  - `DELETE /api/user/{id}`: Remove a user from the database.

## Core Technologies
- **C#**
- **.NET Framework**
- **Entity Framework** for database handling.

## Setup Instructions
1. Clone the repository.
2. Restore dependencies with `dotnet restore`.
3. Start the application with `dotnet run`.