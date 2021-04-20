import { Stock } from "..";
import pool from "../db/db";

// Gets cash of user
export const getCash = async (userID: number) => {
    const user = await pool.query(
        `SELECT cash FROM users WHERE user_id=${userID}`
    );
    return user.rows[0].cash;
};

// Change cash of user
export const changeCash = async (value: number, userID: number) => {
    await pool.query(
        `UPDATE users SET cash=cash+${value} WHERE user_id=${userID}`
    );
};

// Get owned stocks (sum)
export const getOwnedStocks = async (userID: number) => {
    const ownedStocks = await pool.query(
        `SELECT SUM(amount), symbol FROM stocks WHERE user_id=${userID} GROUP BY symbol HAVING Sum(amount) > 0`
    );
    return ownedStocks.rows;
};

// Get stocks history (log)
export const getStockHistory = async (userID: number) => {
    const stockHistory = await pool.query(
        `SELECT * FROM stocks WHERE user_id=${userID}`
    );
    return stockHistory.rows;
};

// Get shares of specific symbol
export const getSharesOfSymbol = async (
    symbol: Stock["symbol"],
    userID: number
) => {
    const sharesOfSymbol = await pool.query(
        `SELECT SUM(amount) FROM stocks WHERE symbol='${symbol.toUpperCase()}' AND user_id=${userID}`
    );
    return sharesOfSymbol.rows[0].sum;
};
