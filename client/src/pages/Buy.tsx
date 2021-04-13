// Imports
import React, { FormEvent, useState } from "react";
import Error from "../common/Error";
import { buyStock } from "./api";

const Buy = () => {
    // Form State
    const [symbol, setSymbol] = useState<Stock["symbol"] | undefined>();
    const [amount, setAmount] = useState<Stock["amount"] | undefined>();
    // Buy Error
    const [error, setError] = useState<string | null>();

    // Buys stock
    const handleBuy = async (e: FormEvent) => {
        e.preventDefault();
        buyStock(symbol, amount).catch((err) => {
            console.dir(err);
            setError(err.response.data.message);
        });
    };
    return (
        <form onSubmit={handleBuy}>
            {error && <Error error={error} setError={setError} />}
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
