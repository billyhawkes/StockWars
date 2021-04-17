// Imports
import axios from "axios";
import { json } from "express";
import { Stock } from "..";
import pool from "../db/db";

// Gets cost of stock from symbol
export const costFromSymbol = async (symbol: string) => {
    const res = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_API_KEY}?datatype=json`
    );
    const cost = await JSON.parse(res.data);
    console.log(cost);
    return cost;
};

export const buyStock = async (
    symbol: Stock["symbol"],
    amount: Stock["amount"],
    cost: Stock["cost"],
    userID: number
) => {
    await pool.query(
        `INSERT INTO stocks (symbol, amount, cost, user_id) VALUES ('${symbol.toUpperCase()}', ${amount}, ${cost}, ${userID})`
    );
};

export const sellStock = async (
    symbol: Stock["symbol"],
    amount: Stock["amount"],
    cost: Stock["cost"],
    userID: number
) => {
    await pool.query(
        `INSERT INTO stocks (symbol, amount, cost, user_id) VALUES ('${symbol.toUpperCase()}', ${-amount}, ${cost}, ${userID})`
    );
};
