// Imports
import express from "express";
const router = express.Router();
import pool from "../db/db";
import dotenv from "dotenv";
dotenv.config();

// Middleware
import { auth } from "../middleware/authMiddleware";

// Helper Functions
import { cost_from_symbol } from "../helpers/stockHelpers";

// Routes //

// Get all stocks
router.get("/", auth, async (req, res) => {
    const { userID } = req.body;
    try {
        const stocks = await pool.query(
            `SELECT * FROM stocks WHERE user_id=${userID}`
        );
        res.json(stocks.rows);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Buy (Post) one stock
router.post("/buy", auth, async (req, res) => {
    const { symbol, amount, userID } = req.body;

    try {
        // Error Checking
        if (!symbol || !amount)
            return res.status(400).json({ message: "Please fill all fields" });
        if (symbol.length > 4 || symbol.length < 1)
            return res
                .status(400)
                .json({ message: "Symbol must be 1-4 chars" });

        // Get Cost
        const cost = await cost_from_symbol(symbol);

        // Check if enough money
        const totalPrice = amount * cost;
        const cash = await pool.query(
            `SELECT cash FROM users WHERE user_id=${userID}`
        );
        const enoughCash = cash.rows[0].cash >= totalPrice;
        if (!enoughCash)
            return res.status(400).json({ message: "Not enough cash" });

        // Buy Stock with (cost, symbol, and amount)
        const stock = await pool.query(
            `INSERT INTO stocks (symbol, amount, cost, user_id) VALUES ('${symbol.toUpperCase()}', ${amount}, ${cost}, ${userID})`
        );

        // Remove cash
        await pool.query(
            `UPDATE users SET cash=cash-${totalPrice} WHERE user_id=${userID}`
        );
        // Return stock
        res.json({ message: `Bought ${amount} shares of ${symbol}` });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Gets Price of stock
router.get("/price/:q", async (req, res) => {
    const symbol = req.params.q;
    try {
        // Get Cost
        const cost = await cost_from_symbol(symbol);
        res.json(cost);
    } catch {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Sell stock
router.post("/sell", auth, async (req, res) => {
    const { symbol, amount, userID } = req.body;

    try {
        // Error Checking
        if (!symbol || !amount)
            return res.status(400).json({ message: "Please fill all fields" });
        if (symbol.length > 4 || symbol.length < 1)
            return res
                .status(400)
                .json({ message: "Symbol must be 1-4 chars" });

        // Grab amount of stock with symbol
        const amountQuery = await pool.query(
            `SELECT SUM(amount) FROM stocks WHERE symbol='${symbol.toUpperCase()}' AND user_id=${userID}`
        );
        const amountOwned = amountQuery.rows[0].sum;

        // Check if stock exists
        if (!amountOwned || amountOwned <= 0)
            return res.status(400).json({
                message: `No stock with symbol: ${symbol}`,
            });

        // Check if you own enough to sell
        if (amount > amountOwned)
            return res.status(400).json({
                message: `Not enough ${symbol} shares. You have: ${amountOwned}`,
            });

        // Sell Stock
        const cost = await cost_from_symbol(symbol);
        await pool.query(
            `INSERT INTO stocks (symbol, amount, cost, user_id) VALUES ('${symbol.toUpperCase()}', ${-amount}, ${cost}, ${userID})`
        );
        // Add cash
        await pool.query(
            `UPDATE users SET cash=cash+${
                amount * cost
            } WHERE user_id=${userID}`
        );
        res.json({ message: `Sold ${amount} ${symbol} shares` });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
