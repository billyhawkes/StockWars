// Imports
import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { buyStock } from "../../helpers/api";
import Error from "../common/Error";
import Form from "../styling/Form";

const StyledBuy = styled.div`
    width: 400px;
    margin: 3rem auto;
`;

const Buy = () => {
    // Form State
    const [symbol, setSymbol] = useState<Stock["symbol"]>();
    const [amount, setAmount] = useState<Stock["amount"]>(1);
    // Buy Error
    const [error, setError] = useState<string | null>();

    // Handles buying stock
    const handleBuy = async (e: FormEvent) => {
        e.preventDefault();

        // Buy stock
        buyStock(symbol, amount).catch((err) => {
            setError(err.response.data.message);
        });

        // Reset form
        setSymbol("");
        setAmount(1);
        setError("");
    };
    return (
        <StyledBuy>
            <Form onSubmit={handleBuy}>
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
            </Form>
        </StyledBuy>
    );
};

export default Buy;
