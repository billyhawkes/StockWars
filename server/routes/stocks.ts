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
router.post("/", async (req, res) => {
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
            `INSERT INTO stocks (symbol, amount, cost) VALUES ('${symbol}', ${amount}, ${cost})`
        );

        // Return stock
        res.json(stock);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

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

export default router;
