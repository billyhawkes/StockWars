// Import
import React, { FormEvent, useState } from "react";

// Utils
import { getPrice } from "../../helpers/api";
import Form from "../styling/Form";

// Component
const PriceChecker = () => {
    // Form State
    const [symbol, setSymbol] = useState<Stock["symbol"]>();
    const [price, setPrice] = useState<number | undefined>();

    // Handles form
    const handlePriceCheck = async (e: FormEvent) => {
        e.preventDefault();

        // Gets Price
        getPrice(symbol).then((res) => setPrice(res));

        // Reset form
        setSymbol("");
    };

    return (
        <Form onSubmit={handlePriceCheck}>
            <h3>Price Checker</h3>
            <label>
                Stock Symbol
                <input
                    type="text"
                    onChange={(e) => setSymbol(e.target.value)}
                    value={symbol}
                />
            </label>
            <input type="submit" value="Check" />
            {price && (
                <>
                    <hr style={{ margin: "1rem 0rem" }} />
                    <h4>Price: {price}</h4>
                </>
            )}
        </Form>
    );
};

export default PriceChecker;
