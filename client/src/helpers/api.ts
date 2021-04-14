// Imports
import axios from "axios";

// Gets all stocks
export const getAllStocks = async () => {
    const res = await axios.get("/stocks");
    const data = await res.data;
    return data;
};

// Buys stock
export const buyStock = async (
    symbol: Stock["symbol"],
    amount: Stock["amount"]
) => {
    const res = await axios.post("/stocks", { symbol, amount });
    return res;
};

// Gets price for one stock
export const getPrice = async (symbol: Stock["symbol"]) => {
    const res = await axios.get(`/stocks/price/${symbol}`);
    const price = await res.data;
    return price;
};
