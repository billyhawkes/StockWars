// Imports
import axios from "axios";
import { json } from "express";
import { Stock } from "..";
import pool from "../db/db";

// Gets cost of stock from symbol
export const costFromSymbol = async (symbol: string) => {
	console.log(process.env.IEX_API_KEY, symbol)
    const costRes = await axios.get(
        `https://cloud.iexapis.com/stable/tops?token=${process.env.IEX_API_KEY}&symbols=${symbol}`
    );
	
    const cost = await costRes.data[0].lastSalePrice;
    return cost;
};

export const buyStock = async (
    symbol: Stock["symbol"],
    amount: Stock["amount"],
    cost: Stock["cost"],
    userID: number
) => {
	console.log("buying stock",symbol);
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
