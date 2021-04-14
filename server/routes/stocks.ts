// Imports
import express from "express";
const router = express.Router();
import pool from "../db/db";
import dotenv from "dotenv";
dotenv.config();

// Helper Functions
import { cost_from_symbol } from "../helpers/stockHelpers";

// Routes //

// Get all stocks
router.get("/", async (req, res) => {
    const stocks = await pool.query("SELECT * FROM stocks");
    res.json(stocks.rows);
});

// Buy (Post) one stock
router.post("/buy", async (req, res) => {
    const { symbol, amount } = req.body;

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

        // Buy Stock with (cost, symbol, and amount)
        const stock = await pool.query(
            `INSERT INTO stocks (symbol, amount, cost) VALUES ('${symbol.toUpperCase()}', ${amount}, ${cost})`
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
router.post("/sell", async (req, res) => {
    const { symbol, amount } = req.body;

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
            `SELECT SUM(amount) FROM stocks WHERE symbol='${symbol.toUpperCase()}'`
        );
        const amountOwned = amountQuery.rows[0].sum;
        console.log(amountOwned);

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
        const sellQuery = await pool.query(
            `INSERT INTO stocks (symbol, amount, cost) VALUES ('${symbol.toUpperCase()}', ${-amount}, ${cost})`
        );
        res.json({ message: `Sold ${amount} ${symbol} shares` });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    // Check if you have enough to sell amount
    // If amount = amount owned, remove row
    // else, change amount to amount owned - amount
});

export default router;
