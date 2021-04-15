// Imports
import axios from "axios";

// Gets all stocks
export const getAllStocks = async () => {
    const res = await axios.get("/stocks", {
        headers: {
            "auth-token": localStorage.getItem("auth-token"),
        },
    });
    const data = await res.data;
    return data;
};

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

// Gets price for one stock
export const getPrice = async (symbol: Stock["symbol"]) => {
    const res = await axios.get(`/stocks/price/${symbol}`);
    const price = await res.data;
    return price;
};

// Gets user info (ex. Cash)
export const getUserInfo = async () => {
    const res = await axios.get("/users", {
        headers: { "auth-token": localStorage.getItem("auth-token") },
    });
    const data = await res.data;
    return data;
};
