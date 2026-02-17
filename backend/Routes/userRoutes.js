import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Register new user
router.post("/users", async (req, res) => {
  try {
    // Get data from request body
    const { name, email, password } = req.body;

    // Does the email already exist?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // if the email already exists, return error messages
      return res.status(400).json({ error: "That email already exists" });
    }

    // Create a new user with a hashed password
    const user = new User({ name, email, password: bcrypt.hashSync(password) });

    await user.save();

    // Return user ID and token on successful registration
    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not create user", errors: err.errors });
  }
});

// When user Log in, send email and password, receive accessToken.
router.post("/sessions", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    // Check if the user exists AND if the password is correct
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ userId: user._id, accessToken: user.accessToken });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
