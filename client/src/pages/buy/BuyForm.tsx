// Import
import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import Error from "../../common/Error";

// Utils
import { buyStock } from "../../utils/api";

// Styling
const StyledBuyForm = styled.form`
    display: inline-block;
    border-radius: 0.3rem;
    text-align: left;
    padding: 2rem;
    background-color: var(--primary-color);
    color: white;

    h3 {
        text-align: center;
        margin-bottom: 1rem;
    }

    input[type="submit"] {
        margin-top: 1rem;
        border-radius: 0.3rem;
        background-color: #2d9cdb;
        border: none;
        color: white;
        padding: 0.5rem;
        :active {
            border: none;
        }
    }
    label {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        input {
            margin-top: 1rem;
            padding: 0.2rem;
        }
    }
`;

const BuyForm = () => {
    // Form State
    const [symbol, setSymbol] = useState<Stock["symbol"]>();
    const [amount, setAmount] = useState<Stock["amount"]>(1);
    // Buy Error
    const [error, setError] = useState<string | null>();

    // Buys stock
    const handleBuy = async (e: FormEvent) => {
        e.preventDefault();
        buyStock(symbol, amount).catch((err) => {
            setError(err.response.data.message);
        });

        // Reset form
        setSymbol("");
        setAmount(1);
        setError("");
    };
    return (
        <StyledBuyForm onSubmit={handleBuy}>
            <h3>Buy</h3>
            {error && <Error error={error} setError={setError} />}
            <label>
                Stock
                <input
                    type="text"
                    name="symbol"
                    onChange={(e) => setSymbol(e.target.value)}
                    value={symbol}
                />
            </label>
            <label>
                Amount
                <input
                    name="amount"
                    type="number"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="1"
                    max="4"
                    value={amount}
                />
            </label>
            <input type="submit" value="Buy" />
        </StyledBuyForm>
    );
};

export default BuyForm;
