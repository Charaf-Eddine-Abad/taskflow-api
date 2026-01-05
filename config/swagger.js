const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TaskFlow API',
            version: '1.0.0',
            description: 'A production-ready RESTful API for task management built with MERN stack',
            contact: {
                name: 'API Support',
                email: 'support@taskflow.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:5001',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'User ID'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        role: {
                            type: 'string',
                            enum: ['user', 'admin'],
                            description: 'User role'
                        }
                    }
                },
                Task: {
                    type: 'object',
                    required: ['title'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Task ID'
                        },
                        title: {
                            type: 'string',
                            description: 'Task title'
                        },
                        description: {
                            type: 'string',
                            description: 'Task description'
                        },
                        status: {
                            type: 'string',
                            enum: ['todo', 'in_progress', 'done'],
                            default: 'todo',
                            description: 'Task status'
                        },
                        priority: {
                            type: 'string',
                            enum: ['low', 'medium', 'high'],
                            default: 'medium',
                            description: 'Task priority'
                        },
                        dueDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Task due date'
                        },
                        userId: {
                            type: 'string',
                            description: 'ID of user who owns the task'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        error: {
                            type: 'string',
                            description: 'Error message'
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Auth',
                description: 'Authentication endpoints'
            },
            {
                name: 'Tasks',
                description: 'Task management endpoints'
            },
            {
                name: 'Admin',
                description: 'Admin-only endpoints'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
