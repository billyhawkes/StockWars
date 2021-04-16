// Imports
import axios from "axios";

// Portfolio //
// Gets all stocks
export const getStockHistory = async () => {
    const res = await axios.get("/stocks/history", {
        headers: {
            "auth-token": localStorage.getItem("auth-token"),
        },
    });
    const data = await res.data;
    return data;
};
// Gets all stocks
export const getStockShares = async () => {
    const res = await axios.get("/stocks/shares", {
        headers: {
            "auth-token": localStorage.getItem("auth-token"),
        },
    });
    const data = await res.data;
    return data;
};

// Buy //
// Buys stock
export const buyStock = async (
    symbol: Stock["symbol"],
    amount: Stock["amount"]
) => {
    const res = await axios.post(
        "/stocks/buy",
        { symbol, amount },
        {
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
            },
        }
    );
    return res;
};

// Sell //
// Sell stock
export const sellStock = async (
    symbol: Stock["symbol"],
    amount: Stock["amount"]
) => {
    const res = await axios.post(
        "/stocks/sell",
        { symbol, amount },

        {
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
            },
        }
    );
    return res;
};

// Home //
// Gets user info (ex. Cash)
export const getUserInfo = async () => {
    const res = await axios.get("/users", {
        headers: { "auth-token": localStorage.getItem("auth-token") },
    });
    const data = await res.data;
    return data;
};

// Other //
// Gets price for one stock
export const getPrice = async (symbol: Stock["symbol"]) => {
    const res = await axios.get(`/stocks/price/${symbol}`);
    const price = await res.data;
    return price;
};
