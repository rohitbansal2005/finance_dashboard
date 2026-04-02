# Finance Data Processing and Access Control Backend

A robust Node.js and Express backend built for a Finance Dashboard System. It features complete Role-Based Access Control (RBAC), Financial Records CRUD capabilities, and Dashboard Analytics.

## Features Implemented

- **Core Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Role-Based Access Control**:
  - `Viewer`: Can only view dashboard/summary data.
  - `Analyst`: Can view financial records and dashboard summaries.
  - `Admin`: Full access (Create, Read, Update, Delete records & manage users).
- **Financial Records CRUD**: Complete management of Income/Expense entries with filtering and pagination.
- **Data Validation**: Strict payload validation using `express-validator`.
- **Security**: Password hashing using `bcryptjs`.
- **API Documentation**: Built-in Swagger UI documentation.

## Project Structure

```text
├── config/           # Database connecting logic 
├── controllers/      # Core business logic for endpoints
├── middlewares/      # Interceptors for Auth, Roles, and Validation
├── models/           # Mongoose Data Schemas (User & Record)
├── routes/           # API Endpoint definitions
├── utils/            # Helper functions (Error Handler, etc)
├── server.js         # Entry point & Express server bootstrap
└── swagger.yaml      # OpenAPI 3.0 Documentation spec
```

## Quick Start (Local Setup)

### Prerequisites
- Node.js (v16+)
- MongoDB connection string (Local or MongoDB Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables inside `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```
4. Start the server:
```bash
# Development mode
npm run dev

# Production
npm start
```

## API Documentation (Swagger)

Start your server and navigate to the built-in Swagger UI to test and view all endpoint specifications:

👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)** 👈

## Design Decisions & Trade-offs

- **NoSQL / MongoDB Strategy**: Chose MongoDB because financial entries can naturally benefit from flexible, document-based schemas (ideal for arbitrary metadata, notes, indexing time sequences).
- **Centralized Error Handling**: Built a custom error handler middleware to avoid repetitive `try/catch` error formatting and ensure a unified JSON error payload structure.
- **Role-Based Guards (Middleware)**: Instead of writing authorization checks inside controllers, custom `protect` and `authorize(...roles)` middlewares elegantly intercept requests, keeping controllers clean and adhering to the Single Responsibility Principle.
