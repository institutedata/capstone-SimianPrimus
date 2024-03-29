"use strict";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Models from "../models/userModel";
import Sequelize from "sequelize";
import User from "../models/userModel";
import dotenv from 'dotenv';
dotenv.config(); // This calls dotenv.config() to load the .env file

interface CustomRequest extends Request {
  file?: Express.Multer.File;
}

// Type definition for the request body
interface LoginRequestBody {
  email: string;
  password: string;
}

// Generate JWT token
const generateToken = (userId: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in .env file");
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Login user
export const loginUser = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find the user with the given email, case-insensitive
    const user = await User.findOne({
      where: Sequelize.where(
        Sequelize.fn('lower', Sequelize.col('email')),
        Sequelize.fn('lower', email)
      ),
    });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed. User not found." });
    }

    // Compare the provided password with the hash in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed. Incorrect password." });
    }

    // Generate a token for the user
    const token = generateToken(user.userId); // Replace `userId` with appropriate user identifier property
    console.log('User logged in:', user.userId);
    // Exclude the password from the user object before sending it
    const userWithoutPassword = { ...user.get({ plain: true }), password: undefined };

    return res.json({ user: userWithoutPassword, token });
  } catch (error: any) { // Consider using a more specific error type if possible
    console.error('Login error:', error);
    return res.status(500).json({ message: "An error occurred during the login process." });
  }
};

// Get all users
export const getUsers = async (_req: any, res: any) => {
  try {
    const users = await Models.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
export const getUser = async (req: any, res: any) => {
  try {
    const user = await Models.findByPk(req.params.id);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
export const createUser = async (req: CustomRequest, res: Response) => {
  try {
    const { email, username, password } = req.body;
    // Check if a file was uploaded
    const file = req.file;
    let imageUrl: string | null = null;

    // If file was uploaded, construct its URL
    if (file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        file.filename
      }`;
    }

    // Implement input validation here (e.g., check fields are not empty and password is strong enough)

    // Check if email or username already exists in the database to handle duplicate entries proactively
    const emailExists = await Models.findOne({
      where: { email: email.toLowerCase() },
    });
    if (emailExists) {
      return res.status(400).json({ message: "This email is already taken." });
    }

    const usernameExists = await Models.findOne({
      where: { username: username.toLowerCase() },
    });
    if (usernameExists) {
      return res
        .status(400)
        .json({ message: "This username is already taken." });
    }

    // Using spread operator to pass all the fields from req.body except the password
    // This assumes that req.body only contains fields that are valid for user creation
    const newUser = await Models.create({
      ...req.body,
      email: email.toLowerCase(), // Ensure email is always saved in lowercase
      username: username.toLowerCase(), // Ensure username is always saved in lowercase
      profileImage: imageUrl,
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
  } catch (error) {
    console.error("Error during user creation:", error); // Log the complete error stack for debugging purposes

    // More nuanced error handling based on possible Sequelize errors
    if (error instanceof Sequelize.UniqueConstraintError) {
      // This would only trigger if the unique constraint check fails at the database level
      // despite the proactive checks above. This could happen if two requests with the same
      // unique data are made at almost the same time.
      return res.status(400).json({
        message:
          "An account with the provided email or username already exists.",
      });
    } else if (error instanceof Sequelize.ValidationError) {
      // Handle Sequelize validation errors
      const messages = error.errors.map((err: any) => err.message).join("; ");
      return res.status(400).json({ message: "Validation error: " + messages });
    } else {
      // For other kinds of errors, you might not want to send the details to the client,
      // especially in a production environment, to avoid potential information leakage.
      // Instead, log them on the server and send a generic message.
      console.error("Error during user creation:", error);
      return res.status(500).json({
        message: "An error occurred during the user creation process.",
      });
    }
  }
};

// Update a user
export const updateUser = async (req: CustomRequest, res: any) => {
  const userId = req.params.id;
  const file = req.file;
  let imageUrl: string | null = null;

  if (file) {
    imageUrl = `${req.protocol}}://${req.get("host")}/uploads/${
      file.filename
    }`;
  }

  try {
    const user = await Models.findByPk(req.params.id);
    if (user) {
      // Update user with new data, including image URL if a new file was uploaded
      const updatedUser = await user.update({
        ...req.body,
        ...(imageUrl && { profileImage: imageUrl }), // Conditionally add profileImage to the update payload
      });
      const userResponse = {
        userId: updatedUser.userId,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        username: updatedUser.username,
        profileImage: updatedUser.profileImage,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      };
      return res.json(userResponse);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    console.error("Error during user update:", error);
    res.status(500).json({ message: error.message });
  }
}; 

// Delete a user
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
