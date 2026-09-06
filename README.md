# TripVault

TripVault is a full-stack authentication application built using React, Node.js, Express, and MongoDB. It allows users to create an account, log in securely, access a protected dashboard, and log out.

## Features

- User registration
- Secure password hashing using bcrypt
- User login and credential validation
- JWT-based authentication
- Protected `/api/auth/me` API route
- Protected Dashboard route
- JWT stored in localStorage
- Logout functionality
- React Router navigation
- MongoDB Atlas database integration
- Responsive authentication UI

## Tech Stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- JSON Web Token (JWT)

## Project Structure

```text
tripvault/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── auth.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md