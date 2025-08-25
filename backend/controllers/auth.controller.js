import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }
        
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        
        await newUser.save();
        
        // Return object with success property that frontend expects
        res.status(201).json({
            success: true,
            message: "User created successfully"
        });
        
    } catch(error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            error: error.message
        });
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        // Find user by email
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }
        
        // Check password
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Wrong credentials!'
            });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        
        // Remove password from user data
        const { password: pass, ...rest } = validUser._doc;
        
        // Return data in the format your frontend expects
        res.status(200).json({
            success: true,                    // ← Frontend checks this
            message: 'Login successful',      // ← Frontend uses this for success message
            jwtToken: token,                  // ← Frontend stores this in localStorage
            name: validUser.username,         // ← Frontend stores this in localStorage
            user: rest                        // ← Additional user data (optional)
        });
        
    } catch(error) {
        console.error('Signin error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};