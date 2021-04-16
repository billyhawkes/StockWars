// Import
import axios from "axios";
import express from "express";
const router = express.Router();
import pool from "../db/db";
import { cost_from_symbol } from "../helpers/stockHelpers";

// Middleware
import { auth } from "../middleware/authMiddleware";

// Get your user info
router.get("/", auth, async (req, res) => {
    const { userID } = req.body;

    try {
        // Get Cash
        const user = await pool.query(
            `SELECT cash FROM users WHERE user_id=${userID}`
        );
        const cash = user.rows[0].cash;

        // Get total stock worth
        const stocks = await pool.query(
            `SELECT SUM(amount), symbol FROM stocks WHERE user_id=${userID} GROUP BY symbol`
        );
        let stockWorth = 0;
        for (let stock of stocks.rows) {
            const cost = await cost_from_symbol(stock.symbol);
            stockWorth += cost * stock.sum;
        }
        // Networth
        const netWorth = cash + stockWorth;
        return res.json({ cash, stockWorth, netWorth });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Leaderboard
//

export default router;
