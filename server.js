const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connectDB = require("./db");
const User = require("./user");
const Score = require("./score");

const app = express();
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

const SECRET_KEY = "your_secret_key"; // Replace with a secure key

// User signup
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Error creating user" });
    }
});

// User login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.json({ token });
});

// Submit score
app.post("/submit-score", async (req, res) => {
    const { token, score } = req.body;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const newScore = new Score({ userId: decoded.userId, score });
        await newScore.save();
        res.json({ message: "Score submitted" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(401).json({ error: "Unauthorized" });
    }
});

// Get leaderboard
app.get("/leaderboard", async (req, res) => {
    try {
        const scores = await Score.find().sort({ score: -1 }).limit(10).populate("userId", "username");
        res.json(scores);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Error fetching leaderboard" });
    }
});

// Serve static files from the frontend (public) folder
app.use(express.static(path.join(__dirname, "public")));

// Define routes for each HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server, listening on all IP addresses
app.listen(9000, '0.0.0.0', () => console.log("Server running on port 9000"));
