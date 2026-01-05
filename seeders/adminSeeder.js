require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

// Admin user data
const adminUser = {
    email: 'admin@taskflow.com',
    password: 'admin123456',
    role: 'admin'
};

// Connect to database and create admin user
const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);


        console.log('MongoDB Connected');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminUser.email });

        if (existingAdmin) {
            console.log('Admin user already exists');
            console.log(`Email: ${existingAdmin.email}`);
            console.log(`Role: ${existingAdmin.role}`);
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create(adminUser);

        console.log('✅ Admin user created successfully!');
        console.log('-----------------------------------');
        console.log(`Email: ${admin.email}`);
        console.log(`Password: ${adminUser.password}`);
        console.log(`Role: ${admin.role}`);
        console.log('-----------------------------------');
        console.log('⚠️  Please change the password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin user:', error.message);
        process.exit(1);
    }
};

seedAdmin();
