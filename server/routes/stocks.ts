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
    const cost = cost_from_symbol(symbol);

    console.log(symbol, amount, cost);
    const stock = await pool.query(
        `INSERT INTO stocks (symbol, amount, cost) VALUES (${symbol}, ${amount}, ${100})`
    );
    res.json(stock);
});

export default router;
