const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const  authenticateToken  = require("../middleware/auth");
const token_model = require("../models/tokenModel");

const router = express.Router();

const generateToken = (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role, location } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({
      email,
      password,
      name,
      role,
      location,
    });


    await user.save();

    const token = generateToken(user._id);

    res.cookie("Token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found")
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Invalid credentials")
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id); 

    res.cookie("Token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true
    });


    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

module.exports = router;