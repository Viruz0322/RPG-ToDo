const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Replace this with your actual user storage implementation
const users = [];

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).send({ message: "User created" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).send({ message: "Invalid username or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username: user.username }, "your-secret-key", {
    expiresIn: "1h",
  });
  res.send({ token });
});

module.exports = router;
