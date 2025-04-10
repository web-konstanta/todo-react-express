# ToDo Web App

This project consists of a React TypeScript frontend and a Node.js Express TypeScript backend.

## Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)
- Git

## Project Structure

```
.
├── frontend/         # React TypeScript frontend
└── backend/          # Node.js Express TypeScript backend
```

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables or copy `.env.example`:
   ```
   DB_USER=postgres
   DB_PASSWORD=root
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=todo_db
   DB_SCHEMA=public
   DATABASE_URL="DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}""
   JWT_SECRET="your_jwt_secret"
   PORT=5000
   ```

4. Set up the database:
   ```bash
   npm run db:migrate
   ```

5. Start the development server:
   ```bash
   npm run build
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

### Backend

- `npm run dev` - Starts the development server with hot-reload
- `npm run build` - Builds the TypeScript code
- `npm start` - Runs the built code
- `npm run db:migrate` - Runs database migrations
- `npm run watch` - Watches for TypeScript changes

### Frontend

- `npm start` - Starts the development server
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App

## Development

- Backend runs on `http://localhost:5000` by default
- Frontend runs on `http://localhost:3000` by default

## Environment Variables

### Backend (.env)
- `DATABASE_URL` - Your database connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Port number for the backend server

### Frontend (.env)
- `REACT_APP_API_URL` - URL of the backend API

## Technologies Used

### Backend
- Node.js
- Express
- TypeScript
- Prisma (ORM)
- JWT for authentication
- bcrypt for password hashing

### Frontend
- React
- TypeScript
- React Router
- Axios for API calls
