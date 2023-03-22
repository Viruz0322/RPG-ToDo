const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");


const crypto = require('crypto');

function generateSecretKey(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

const secretKey = "your-secret-key" || generateSecretKey();
console.log('Secret key:', secretKey);





const jwtSecret = secretKey; 

router.post("/signup", async (req, res) => {
  console.log("Signup request received:", req.body);
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log("Username already exists.");
      return res.status(400).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    console.log("User created and saved:", savedUser);

    res.json({ success: true });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  console.log("Login request received:", req.body);
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    console.log("isuservalid",user)
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("is password valid",isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1d" });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("Error", err);
  }
});

router.post("/logout", (req, res) => {
  res.json({ success: true });
});

module.exports = router;