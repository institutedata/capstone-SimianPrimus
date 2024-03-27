"use strict";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Models from "../models/userModel";
import Sequelize from "sequelize";

// Generate JWT token
const generateToken = (userId: string) => {
    const secretKey = process.env.JWT_SECRET || "your_default_secret_key_here";
    return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await Models.findOne({
            where: Sequelize.where(
                Sequelize.fn("LOWER", Sequelize.col("email")),
                Sequelize.fn("LOWER", email)
            ),
        }); // Case-insensitive email comparison

        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        const token = generateToken(user.id);
        res.json({ user, token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (_req: any, res: any) => {
    try {
        const users = await Models.findAll();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req: any, res: any) => {
    try {
        const user = await Models.findByPk(req.params.id);
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        // Implement input validation here (e.g., check fields are not empty and password is strong enough)

        // Hash the password before saving
        const saltRounds = 10; // You can adjust saltRounds as per your security requirements
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Check if email or username already exists in the database to handle duplicate entries proactively
        const emailExists = await Models.findOne({ where: { email: email.toLowerCase() } });
        if (emailExists) {
            return res.status(400).json({ message: "This email is already taken." });
        }

        const usernameExists = await Models.findOne({ where: { username: username.toLowerCase() } });
        if (usernameExists) {
            return res.status(400).json({ message: "This username is already taken." });
        }

        // Using spread operator to pass all the fields from req.body except the password
        // This assumes that req.body only contains fields that are valid for user creation
        const newUser = await Models.create({
            ...req.body,
            password: hashedPassword
        });

        const token = generateToken(newUser.userId.toString());
        
        // Prepare user response (excluding sensitive data like the password)
        const userResponse = {
            userId: newUser.userId, 
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            username: newUser.username,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };

        return res.status(201).json({ user: userResponse, token });
        
    } catch (error: any) {
        console.error("Error during user creation:", error.stack || error); // Log the complete error stack for debugging purposes
        
        // More nuanced error handling based on possible Sequelize errors
        if (error instanceof Sequelize.UniqueConstraintError) {
            // This would only trigger if the unique constraint check fails at the database level
            // despite the proactive checks above. This could happen if two requests with the same
            // unique data are made at almost the same time.
            return res.status(400).json({ message: "An account with the provided email or username already exists." });
        } else if (error instanceof Sequelize.ValidationError) {
            // Handle Sequelize validation errors
            const messages = error.errors.map((err: any) => err.message).join("; ");
            return res.status(400).json({ message: "Validation error: " + messages });
        } else {
            // For other kinds of errors, you might not want to send the details to the client,
            // especially in a production environment, to avoid potential information leakage.
            // Instead, log them on the server and send a generic message.
            return res.status(500).json({ message: "An error occurred during the user creation process." });
        }
    }
};

    export const updateUser = async (req: any, res: any) => {
        try {
            const user = await Models.findByPk(req.params.id);
            if (user) {
                user.update(req.body);
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    export const deleteUser = async (req: any, res: any) => {
        try {
            const user = await Models.findByPk(req.params.id);
            if (user) {
                user.destroy();
                res.json({ message: "User deleted" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    export default {
        getUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        loginUser,
    };
