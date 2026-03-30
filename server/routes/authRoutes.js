const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =========================
// REGISTER
// =========================
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ ROLE SET HERE
    const user = await User.create({
      email,
      password,
      role: "citizen"
    });

    res.json({ message: "User registered successfully" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ INCLUDE ROLE IN TOKEN
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret123",
      { expiresIn: "1d" }
    );

    // ✅ SEND ROLE TO FRONTEND
    res.json({
      token,
      role: user.role,
      message: "Login successful"
    });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;