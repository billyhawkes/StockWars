// Imports
import axios from "axios";
import { Stock } from "..";
import pool from "../db/db";

// Gets cost of stock from symbol
export const costFromSymbol = async (symbol: string) => {
    console.log(symbol, process.env.STOCK_API_KEY);
    const res = await axios.get(
        `https://cloud.iexapis.com/stable/tops?token=${process.env.STOCK_API_KEY}&symbols=${symbol}`
    );
    const cost = await res.data[0].lastSalePrice;
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
