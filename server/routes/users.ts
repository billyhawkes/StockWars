// Import
import axios from "axios";
import express from "express";
const router = express.Router();
import pool from "../db/db";

// Middleware
import { auth } from "../middleware/authMiddleware";

router.get("/", auth, async (req, res) => {
    const { userID } = req.body;

    try {
        const user = await pool.query(
            `SELECT cash FROM users WHERE user_id=${userID}`
        );
        return res.json(user.rows[0]);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
