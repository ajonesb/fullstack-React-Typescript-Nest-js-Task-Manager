## Task Management System

## Overview

This Task Management System is a full-stack web application built with React on the frontend and NestJS on the backend. 

It allows users to register, log in, create tasks, mark them as complete, and delete them. The application demonstrates the use of modern web technologies and follows best practices in both frontend and backend development such as SOLID, DRY, KISS principles.

## Technologies Used

- Frontend

* React
* TypeScript
* Tailwind CSS
* Axios for API calls
* React Router for navigation
* Jest, Cypress, and React Testing Library for testing

- Backend 

* NestJS
* TypeScript
* PostgreSQL with TypeORM
* Passport.js for authentication
* JWT for token-based authentication
* Class-validator for DTO validation

## Project Structure

task-management-system/
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── types/
│ │ ├── App.tsx
│ │ └── index.tsx
│ ├── package.json
│ └── tsconfig.json
├── backend/
│ ├── src/
│ │ ├── auth/
│ │ ├── tasks/
│ │ ├── users/
│ │ ├── app.module.ts
│ │ └── main.ts
│ ├── test/
│ ├── package.json
│ └── tsconfig.json
└── README.md

## Frontend Details

The frontend is built with React and TypeScript, using functional components and hooks for state management.

## Key Components

- App.tsx: The main component that handles routing.
- Home.tsx: The main page component that renders either the login/register form or the task management interface.
- TaskForm.tsx: Allows users to add new tasks.
- TaskList.tsx: Displays the list of tasks.
- TaskItem.tsx: Represents a single task item with toggle and delete functionality.
- UserAuth.tsx: Handles user registration and login.

## Custom Hooks

- useAuth.ts: Manages authentication state and operations.
- useTasks.ts: Manages tasks state and CRUD operations.

## Services

api.ts: Configures Axios for API calls and handles token management.

## Backend Details

The backend is built with NestJS, following a modular MVC (Model, View, Controller) structure with clear separation of concerns.

## Modules

- AuthModule: Handles user authentication and JWT strategy.
- UsersModule: Manages user-related operations.
- TasksModule: Handles CRUD operations for tasks.

## Key Components in Each Module

- Controller: Handles HTTP requests and defines API endpoints.
- Service: Contains business logic and interacts with the repository.
- Entity: Defines the database schema for the module.
- DTO (Data Transfer Object): Defines the shape of data for creating and updating records.

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. The AuthModule is responsible for user login and token generation. The JwtAuthGuard is used to protect routes that require authentication.

## Database

PostgreSQL is used as the database, with TypeORM as the ORM (Object-Relational Mapping) tool. The database schema is defined through entities in the NestJS application.

## How It Works

- Users can register or log in through the frontend interface.
- Upon successful authentication, a JWT is generated and stored in the browser's local storage.
- Authenticated users can create, view, update, and delete their tasks.
- All API requests (except login and register) require the JWT to be sent in the Authorization header.
- The backend validates the JWT for protected routes and associates tasks with the authenticated user.

## Setting Up and Running the Project

- Frontend

1. Navigate to the frontend directory.
2. Run npm install to install dependencies.
3. Create a .env file and set REACT_APP_API_URL to your backend URL.
4. Run npm start to start the development server.

- Backend

1. Navigate to the backend directory.
2. Run npm install to install dependencies.
3. Set up a PostgreSQL database and update the connection details in app.module.ts.
4. Run npm run start:dev to start the NestJS server in development mode.

## Testing

- Frontend: Run npm test in the frontend directory to run Jest tests.
- Backend: Run npm run test in the backend directory for unit tests, and npm run test:e2e for end-to-end tests.

## Deployment

For deployment, you'll need to:

1. Build the frontend (npm run build in the frontend directory).
2. Set up a production database for the backend.
3. Configure environment variables for both frontend and backend.
4. Deploy the backend to a Node.js hosting service.
5. Deploy the frontend build to a static file hosting service.

## Conclusion

This Task Management System demonstrates a full-stack JavaScript application with a clear separation of concerns, modern authentication practices, and a scalable architecture. It serves as a solid foundation for building more complex applications and can be extended with additional features as needed.

![image](https://github.com/user-attachments/assets/0f17f666-7602-403c-942b-eba943294591)

![image](https://github.com/user-attachments/assets/371c4915-4934-4403-808f-893e6864c569)
