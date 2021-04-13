// Imports
import axios from "axios";

export const getAllStocks = async () => {
    const res = await axios.get("/stocks");
    const data = await res.data;
    return data;
};

export const buyStock = async (
    symbol: Stock["symbol"],
    amount: Stock["amount"]
) => {
    const res = await axios.post("/stocks", { symbol, amount });
    return res;
};
