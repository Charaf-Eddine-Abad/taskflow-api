# TaskFlow API - Project Overview

## Introduction

**TaskFlow API** is a production-ready RESTful backend service built with the MERN stack (MongoDB, Express.js, Node.js) designed for task management. It provides secure authentication, role-based access control, and comprehensive CRUD operations for managing tasks individually or within teams.

This is a **backend-only** API that can be consumed by any frontend application (web, mobile, or desktop), making it ideal as a portfolio project or foundation for task management applications.

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB (with Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Validation** | Express Validator / Joi |
| **Documentation** | Swagger UI |
| **Deployment** | MongoDB Atlas, Render/Railway |

---

## Core Features

### 🔐 Authentication & Authorization
- User registration with email and password
- Secure login with JWT token issuance
- Password hashing (bcrypt)
- Protected routes with middleware authentication
- Role-based access control (User/Admin roles)

### ✅ Task Management
Full CRUD operations for tasks with:
- **Attributes**: Title, description, status, priority, due date
- **Status Options**: `todo`, `in_progress`, `done`
- **Priority Levels**: `low`, `medium`, `high`
- **Filtering**: By status and priority
- **Pagination**: Efficient data retrieval
- **Ownership**: Users manage only their own tasks

### 👤 User Roles

| Role | Capabilities |
|------|-------------|
| **Regular User** | Create, read, update, delete own tasks; filter and paginate task lists |
| **Admin** | All user capabilities + view all tasks system-wide; view tasks by specific user; monitor system usage |

---

## API Architecture

### Endpoint Structure

```
auth/
├── POST /api/auth/register     # User registration
└── POST /api/auth/login        # User login (returns JWT)

tasks/
├── GET    /api/tasks           # List user's tasks (with filters & pagination)
├── POST   /api/tasks           # Create new task
├── GET    /api/tasks/:id       # Get specific task
├── PUT    /api/tasks/:id       # Update task
└── DELETE /api/tasks/:id       # Delete task

admin/
├── GET /api/admin/tasks        # View all tasks in system
└── GET /api/admin/users/:id/tasks  # View tasks by specific user
```

---

## Data Models

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique, required, validated),
  password: String (hashed, required, min 8 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  status: String (enum: ['todo', 'in_progress', 'done'], default: 'todo'),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  dueDate: Date,
  userId: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Security & Validation

### Security Measures
- ✅ Passwords hashed with bcrypt (salt rounds: 10+)
- ✅ JWT tokens with configurable expiration
- ✅ Environment variables for all secrets
- ✅ Input sanitization to prevent injection attacks
- ✅ Protected routes requiring valid JWT
- ✅ Role-based middleware for admin endpoints

### Validation Rules
- **Email**: Must be valid format
- **Password**: Minimum 8 characters
- **Task Title**: Required field
- **Status**: Must be one of: `todo`, `in_progress`, `done`
- **Priority**: Must be one of: `low`, `medium`, `high`
- **Due Date**: Must be valid date format

---

## Project Structure

```
TaskFlow-API/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Registration, login logic
│   ├── taskController.js     # Task CRUD logic
│   └── adminController.js    # Admin operations
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   ├── roleMiddleware.js     # RBAC enforcement
│   └── errorHandler.js       # Centralized error handling
├── models/
│   ├── User.js               # User schema
│   └── Task.js               # Task schema
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── adminRoutes.js
├── utils/
│   └── validators.js         # Reusable validation functions
├── .env                      # Environment variables
├── server.js                 # Express app entry point
└── package.json
```

---

## Success Criteria

✅ **Authentication**: Secure JWT-based authentication with role-based access  
✅ **Code Quality**: Clean, modular architecture with separation of concerns  
✅ **Error Handling**: Consistent error responses with proper HTTP status codes  
✅ **Validation**: Comprehensive input validation on all endpoints  
✅ **Documentation**: Complete API documentation via Swagger UI  
✅ **Performance**: Efficient MongoDB queries with pagination  
✅ **Production Ready**: Environment-based configuration, ready for deployment  

---

## Out of Scope

❌ Frontend UI implementation  
❌ Real-time features (WebSockets)  
❌ Email notifications  
❌ File upload functionality  
❌ Task comments or collaboration features  

---

## Future Enhancements

- Task commenting system
- Task sharing between users
- Refresh token implementation
- Rate limiting for API endpoints
- Email notifications for due dates
- Task categories and tags
- Team/workspace functionality

---

## Deployment Targets

- **Database**: MongoDB Atlas (cloud-hosted)
- **API Hosting**: Render, Railway, or Heroku
- **Environment**: Production-ready with environment variable configuration

---

## Getting Started

Once implemented, developers will:
1. Clone the repository
2. Install dependencies (`npm install`)
3. Configure environment variables (`.env`)
4. Connect to MongoDB
5. Run the server (`npm start` or `npm run dev`)
6. Access API documentation at `/api-docs` (Swagger UI)
7. Test endpoints with Postman or similar tools

---

**Status**: Ready for implementation  
**Target Delivery**: Production-ready REST API with complete documentation
