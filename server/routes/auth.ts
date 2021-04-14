// Imports
import express from "express";
const router = express.Router();

// Login
router.get("/login", (req, res) => {
    res.send("Login");
});

// Register
router.get("/register", (req, res) => {
    res.send("Register");
});

export default router;
