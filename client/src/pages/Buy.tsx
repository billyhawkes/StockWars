// Imports
import axios from "axios";
import React, { useState } from "react";

const Buy = () => {
    const [symbol, setSymbol] = useState<Stock["symbol"]>();
    const [amount, setAmount] = useState<Stock["amount"]>();

    // Buys stock
    const handleBuy = async () => {
        const res = await axios.post("/stocks", { symbol, amount });
        console.log(res);
    };
    return (
        <form onSubmit={handleBuy}>
            <label>
                Stock
                <input
                    type="text"
                    name="symbol"
                    onChange={(e) => setSymbol(e.target.value)}
                />
            </label>
            <label>
                Amount
                <input
                    name="amount"
                    type="number"
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </label>
            <input type="submit" value="Buy" />
        </form>
    );
};

export default Buy;
