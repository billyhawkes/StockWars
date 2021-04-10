// Imports
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Gets cost of stock from symbol
export const cost_from_symbol = async (symbol: any) => {
    try {
        const res = await axios.get(
            `https://cloud.iexapis.com/stable/tops?token=${process.env.STOCK_API_KEY}&symbols=${symbol}`
        );
        const cost = await res.data[0].lastSalePrice;
        return cost;
    } catch (err) {
        return err;
    }
};
