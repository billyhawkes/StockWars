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
    const res = await axios.post("/stocks/buy", { symbol, amount });
    return res;
};

// Sell stock
export const sellStock = async (
    symbol: Stock["symbol"],
    amount: Stock["amount"]
) => {
    const res = await axios.post("/stocks/sell", { symbol, amount });
    return res;
};

// Gets price for one stock
export const getPrice = async (symbol: Stock["symbol"]) => {
    const res = await axios.get(`/stocks/price/${symbol}`);
    const price = await res.data;
    return price;
};

// Login
export const login = async (
    identity: User["email"] | User["username"],
    password: User["password"]
) => {
    const res = await axios.post("/auth/login", { identity, password });
    const data = await res.data;
    localStorage.setItem("auth-token", data.token);
    return data;
};
// Register
export const register = async (
    username: User["username"],
    email: User["email"],
    password: User["password"],
    passwordCheck: User["password"]
) => {
    const res = await axios.post("/auth/register", {
        username,
        email,
        password,
        passwordCheck,
    });
    const data = await res.data;
    localStorage.setItem("auth-token", data.token);
    return data;
};
