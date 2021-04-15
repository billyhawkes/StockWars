// Imports
import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import pool from "../db/db";
import bcrypt from "bcrypt";

// Login
router.post("/login", (req, res) => {
    const { user, password } = req.body;

    // no user or password
    if (!user || !password)
        res.status(400).json({ message: "Please fill in all fields" });
    // username doesn't exist
    // password is incorrect
    // Login

    res.send("Login");
});

// Register
router.post("/register", async (req, res) => {
    const { username, email, password, passwordCheck } = req.body;

    // Error Checking //
    // no user or password
    if (!username || !email || !password || !passwordCheck)
        return res.status(400).json({ message: "Please fill in all fields" });
    // passwords don't match
    if (password != passwordCheck)
        return res.status(400).json({ message: "Passwords don't match" });
    // password is less than 8 characters
    if (password.length < 8)
        return res
            .status(400)
            .json({ message: "Password must be atleast 8 characters" });
    // username/email already exists
    const matchingUsers = await pool.query(
        `SELECT * FROM users WHERE username='${username}' OR email='${email}'`
    );
    if (matchingUsers.rows[0])
        return res
            .status(400)
            .json({ message: "Username or Email already exists" });

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const addUser = await pool.query(
        `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}')`
    );

    // Login
    res.json(addUser);
});

export default router;
