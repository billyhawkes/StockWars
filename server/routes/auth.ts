// Imports
import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import pool from "../db/db";
import bcrypt from "bcrypt";
import { auth } from "../middleware/authMiddleware";

// Login
router.post("/login", async (req, res) => {
    const { identity, password } = req.body;

    try {
        // no user or password
        if (!identity || !password)
            return res
                .status(400)
                .json({ message: "Please fill in all fields" });
        // username doesn't exist
        const user = await pool.query(
            `SELECT user_id, username, password FROM users WHERE username='${identity}' OR email='${identity}' `
        );
        if (!user.rows[0])
            return res
                .status(400)
                .json({ message: "Username or Email doesn't exist" });
        // password is incorrect
        const passMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!passMatch)
            return res.status(400).json({ message: "Incorrect Password" });

        // Login
        const token = await jwt.sign(
            { id: user.rows[0].user_id },
            `${process.env.JWT_SECRET}`
        );

        return res.json({
            token,
            id: user.rows[0].user_id,
            username: user.rows[0].username,
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Register
router.post("/register", async (req, res) => {
    const { username, email, password, passwordCheck } = req.body;

    try {
        // Error Checking //
        if (!username || !email || !password || !passwordCheck)
            return res
                .status(400)
                .json({ message: "Please fill in all fields" });
        if (password != passwordCheck)
            return res.status(400).json({ message: "Passwords don't match" });
        if (password.length < 8)
            return res
                .status(400)
                .json({ message: "Password must be atleast 8 characters" });
        const matchingUsers = await pool.query(
            `SELECT * FROM users WHERE username='${username}' OR email='${email}'`
        );
        if (matchingUsers.rows[0])
            return res
                .status(400)
                .json({ message: "Username or Email already exists" });

        // Adding User //
        // hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const addUser = await pool.query(
            `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}') RETURNING user_id, username`
        );

        // Login
        const token = await jwt.sign(
            { id: addUser.rows[0].user_id },
            `${process.env.JWT_SECRET}`
        );

        res.json({
            token,
            id: addUser.rows[0].user_id,
            username: addUser.rows[0].username,
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        // Search for users
        const user = await pool.query(
            `SELECT user_id, username FROM users WHERE user_id=${req.body.userID}`
        );

        // If the user didn't exist
        if (!user) {
            return res.json(false);
        } else {
            return res.json({
                id: user.rows[0].user_id,
                username: user.rows[0].username,
            });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
