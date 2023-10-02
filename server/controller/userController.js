import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, ph_no } = req.body;

    // Validate the request data
    if (!name || !email || !password || !ph_no) {
      return res.status(400).json({
        message: "Please fill in all the required fields",
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      ph_no,
    });

    // Create and send an access token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.status(201).json({
      token,
      user_id: user._id,
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create user",
      status: 500,
    });
  }
});

// Log in a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid email or password",
        status: 401,
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        message: "You are blocked, please contact us",
        status: 403,
      });
    }

    // Create and send an access token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    if (email === "saswatranjan0602@gmail.com" && password === "Saswat@0602") {
      return res.status(200).json({
        token,
        user_id: user._id,
        user_name: user.name,
        message: "Logged in as admin",
        status: 200,
      });
    }

    res.status(200).json({
      token,
      user_id: user._id,
      user_name: user.name,
      message: "User authenticated successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to log in",
      status: 500,
    });
  }
});

// Get specific user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        user,
        message: "User not found",
        status: 404,
      });
    }

    res.status(200).json({
      user,
      message: "User found",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get user",
      status: 500,
    });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      users,
      message: "All users retrieved successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get users",
      status: 500,
    });
  }
});

// Toggle user's activation status
router.put("/toggle-activation/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }

    user.is_active = !user.is_active;
    await user.save();

    res.status(200).json({
      message: "User activation status updated successfully",
      is_active: user.is_active,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to toggle user activation status",
      status: 500,
    });
  }
});

export default router;
