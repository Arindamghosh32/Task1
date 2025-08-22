const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const {generatewebtoken} = require('../utils/generatewebtoken');
const {isLoggedin} = require('./../middleware/isLoggedin');


router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "The User is already created. Please Login!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = generatewebtoken(user);
    res.cookie("token", token);

    return res.status(201).json({
      message: "The user created successfully",
      token,
      role: user.role,
      email: user.email,
      name: user.name
    });

  } catch (err) {
    console.log("There is an error registering the user", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generatewebtoken(user);

    return res.json({
      message: "Login successful",
      token,
      role: user.role,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get('/logout',isLoggedin,(req,res)=>{
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
})


module.exports = router;
