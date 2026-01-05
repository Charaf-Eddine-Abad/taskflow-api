const { body, validationResult } = require('express-validator');

// Validation middleware to check for errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
};

// Registration validation
const validateRegister = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    validate
];

// Login validation
const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    validate
];

// Task creation validation
const validateTask = [
    body('title')
        .notEmpty()
        .withMessage('Task title is required')
        .trim(),
    body('description')
        .optional()
        .trim(),
    body('status')
        .optional()
        .isIn(['todo', 'in_progress', 'done'])
        .withMessage('Status must be one of: todo, in_progress, done'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be one of: low, medium, high'),
    body('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Due date must be a valid date'),
    validate
];

// Task update validation
const validateTaskUpdate = [
    body('title')
        .optional()
        .notEmpty()
        .withMessage('Task title cannot be empty')
        .trim(),
    body('description')
        .optional()
        .trim(),
    body('status')
        .optional()
        .isIn(['todo', 'in_progress', 'done'])
        .withMessage('Status must be one of: todo, in_progress, done'),
    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Priority must be one of: low, medium, high'),
    body('dueDate')
        .optional()
        .isISO8601()
        .withMessage('Due date must be a valid date'),
    validate
];

module.exports = {
    validateRegister,
    validateLogin,
    validateTask,
    validateTaskUpdate
};
