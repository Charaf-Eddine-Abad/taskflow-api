const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Get all tasks in the system
// @route   GET /api/admin/tasks
// @access  Private/Admin
const getAllTasks = async (req, res, next) => {
    try {
        const { status, priority, page = 1, limit = 10 } = req.query;

        // Build query
        const query = {};

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Execute query with pagination and populate user info
        const tasks = await Task.find(query)
            .populate('userId', 'email role')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(skip);

        // Get total count for pagination metadata
        const total = await Task.countDocuments(query);

        res.status(200).json({
            success: true,
            count: tasks.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get tasks by specific user
// @route   GET /api/admin/users/:id/tasks
// @access  Private/Admin
const getUserTasks = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Check if user exists
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get tasks for the user
        const tasks = await Task.find({ userId: req.params.id })
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip(skip);

        // Get total count
        const total = await Task.countDocuments({ userId: req.params.id });

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            },
            count: tasks.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTasks,
    getUserTasks
};
