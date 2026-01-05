# TaskFlow API

A production-ready RESTful API for task management built with the MERN stack (MongoDB, Express.js, Node.js). Features secure JWT authentication, role-based access control, and comprehensive CRUD operations.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with bcrypt password hashing (10 salt rounds)
- **Role-Based Access Control**: User and Admin roles with protected routes
- **Task Management**: Full CRUD operations with pagination and filtering
- **Input Validation**: Comprehensive validation using express-validator
- **Error Handling**: Centralized error handling with meaningful responses
- **API Documentation**: Interactive Swagger UI + Postman collection
- **Production Ready**: Clean architecture, environment-based configuration

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Usage Examples](#-usage-examples)
- [Documentation](#-documentation)
- [Deployment](#-deployment)

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Documentation**: Swagger UI, Postman
- **Security**: bcryptjs, CORS

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Charaf-Eddine-Abad/taskflow-api.git
   cd taskflow-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update the values:
   ```env
   PORT=5001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/taskflow
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=24h
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Run the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Create admin user (optional)**
   ```bash
   npm run seed:admin
   ```
   
   Default admin credentials:
   - Email: `admin@taskflow.com`
   - Password: `admin123456`

The API will be running at `http://localhost:5001`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get user's tasks | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| GET | `/api/tasks/:id` | Get task by ID | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

### Admin
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/admin/tasks` | Get all tasks | Admin |
| GET | `/api/admin/users/:id/tasks` | Get user's tasks | Admin |

### Query Parameters

**Tasks endpoints support:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (todo, in_progress, done)
- `priority` - Filter by priority (low, medium, high)

**Example:**
```
GET /api/tasks?page=1&limit=10&status=todo&priority=high
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5001 |
| `NODE_ENV` | Environment mode | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/taskflow |
| `JWT_SECRET` | Secret key for JWT | - |
| `JWT_EXPIRE` | JWT token expiration | 24h |

## 📁 Project Structure

```
TaskFlow API/
├── config/
│   ├── db.js                    # MongoDB connection
│   └── swagger.js               # Swagger configuration
├── controllers/
│   ├── authController.js        # Authentication logic
│   ├── taskController.js        # Task CRUD operations
│   └── adminController.js       # Admin operations
├── middleware/
│   ├── authMiddleware.js        # JWT verification
│   ├── roleMiddleware.js        # Role-based access control
│   └── errorHandler.js          # Error handling
├── models/
│   ├── User.js                  # User schema
│   └── Task.js                  # Task schema
├── routes/
│   ├── authRoutes.js            # Auth endpoints
│   ├── taskRoutes.js            # Task endpoints
│   └── adminRoutes.js           # Admin endpoints
├── seeders/
│   └── adminSeeder.js           # Admin user seeder
├── utils/
│   └── validators.js            # Input validation
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── server.js                    # Application entry point
└── package.json                 # Dependencies
```

## 💡 Usage Examples

### Register a User

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create a Task

```bash
curl -X POST http://localhost:5001/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "status": "todo",
    "priority": "high",
    "dueDate": "2026-01-15T00:00:00.000Z"
  }'
```

### Get Tasks with Filters

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  "http://localhost:5001/api/tasks?page=1&limit=10&status=todo&priority=high"
```

## 📚 Documentation

### Swagger UI

Interactive API documentation is available at:
```
http://localhost:5001/api-docs
```

Features:
- Complete endpoint documentation
- Request/response schemas
- Try-it-out functionality
- Authentication support

### Postman Collection

Import the Postman collection from `TaskFlow_API.postman_collection.json` for easy API testing.

The collection includes:
- All endpoints pre-configured
- Automatic token management
- Example requests

## 🚢 Deployment

### Environment Setup

1. **Update environment variables for production:**
   ```env
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=strong_random_secret_key
   ```

2. **Recommended platforms:**
   - **API**: Render, Railway, Heroku
   - **Database**: MongoDB Atlas

### Security Considerations

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Update MongoDB URI to production database
- [ ] Configure CORS for specific origins
- [ ] Add rate limiting (e.g., express-rate-limit)
- [ ] Add security headers (e.g., helmet.js)
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging

## 🧪 Testing

The API has been tested with:
- ✅ User registration and login
- ✅ JWT token generation and validation
- ✅ Task CRUD operations
- ✅ Pagination and filtering
- ✅ Role-based access control
- ✅ Input validation
- ✅ Error handling

## 📝 Scripts

```bash
# Start server in production mode
npm start

# Start server in development mode with auto-reload
npm run dev

# Create admin user
npm run seed:admin
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Charaf Eddine Abad - [GitHub Profile](https://github.com/Charaf-Eddine-Abad)

## 🙏 Acknowledgments

- Built as a portfolio project demonstrating MERN stack backend development
- Follows REST API best practices
- Production-ready architecture

---

**⭐ If you find this project useful, please consider giving it a star!**
