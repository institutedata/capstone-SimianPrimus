"use strict";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Models from "../models/userModel";
import Sequelize from "sequelize";
import User from "../models/userModel";
import dotenv from "dotenv";
dotenv.config(); // This calls dotenv.config() to load the .env file

// Type definition for the request object with a file property
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
  // Generate a token with the userId and the JWT_SECRET from the .env file
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Login user
export const loginUser = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find the user with the given email, case-insensitive
    const user = await User.findOne({
      where: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("email")),
        Sequelize.fn("lower", email)
      ),
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    // Compare the provided password with the hash in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }

    // Generate a token for the user
    const token = generateToken(user.userId);
    console.log("User logged in:", user.userId);
    // Exclude the password from the user object before sending it
    const userWithoutPassword = {
      ...user.get({ plain: true }),
      password: undefined,
    };

    return res.json({ user: userWithoutPassword, token });
  } catch (error: any) {
    // Consider using a more specific error type if possible
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during the login process." });
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

    // Implement input validation here

    // Check if email or username already exists in the database to handle duplicate entries proactively
    const emailExists = await Models.findOne({
      where: { email: email.toLowerCase() },
    });
    if (emailExists) {
      return res.status(400).json({ message: "This email is already taken." });
    }
    // Check if username already exists in the database
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
    // Generate a token for the user
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
      console.error("Error during user creation:", error);
      return res.status(500).json({
        message: "An error occurred during the user creation process.",
      });
    }
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const file = req.file;
  let imageUrl: string | null = null;

  if (file) {
    imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  }

  try {
    const user = await Models.findByPk(userId);
    if (user) {
      const updates = req.body;

      // Check if password is being updated
      if (updates.password) {
        const hashedPassword = await bcrypt.hash(updates.password, 10);
        updates.password = hashedPassword;
      }

      // Update user with new data, including image URL if a new file was uploaded
      const updatedUser = await user.update({
        ...updates,
        ...(imageUrl && { profileImage: imageUrl }), // Only add profileImage if imageUrl is not null
      });

      // Prepare the response data without the password field
      const userResponse = {
        userId: updatedUser.userId,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        username: updatedUser.username,
        profileImage: updatedUser.profileImage,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        // Do not send back the password, even if it's hashed
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
