// Imports
import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { buyStock } from "../../helpers/api";
import Error from "../common/Error";
import SuccessMsg from "../common/SuccessMsg";
import Form from "../styling/Form";

const StyledBuy = styled.div`
    width: 400px;
    margin: 3rem auto;
`;

const Buy = () => {
    // Form State
    const [symbol, setSymbol] = useState<Stock["symbol"]>("");
    const [amount, setAmount] = useState<Stock["amount"]>(1);
    // Buy Error/Success
    const [error, setError] = useState<string>("");
    const [successMsg, setSuccessMsg] = useState<string>("");

    // Handles buying stock
    const handleBuy = async (e: FormEvent) => {
        e.preventDefault();

        // Buy stock
        buyStock(symbol, amount)
            .then((res) => {
                setSuccessMsg(res.data.message);
                // Reset form
                setSymbol("");
                setAmount(1);
                setError("");
            })
            .catch((err) => {
                setError(err.response.data.message);
            });
    };
    return (
        <StyledBuy>
            <Form onSubmit={handleBuy}>
                <h3>Buy</h3>
                {successMsg && (
                    <SuccessMsg
                        successMsg={successMsg}
                        setSuccessMsg={setSuccessMsg}
                    />
                )}
                {error && <Error error={error} setError={setError} />}
                <label>
                    Stock Symbol
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
                        value={amount}
                        min="1"
                    />
                </label>
                <input type="submit" value="Buy" />
            </Form>
        </StyledBuy>
    );
};

export default Buy;
