// Imports
import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { sellStock } from "../../helpers/api";
import Error from "../common/Error";
import SuccessMsg from "../common/SuccessMsg";
import Form from "../styling/Form";

const StyledSell = styled.div`
    width: 400px;
    margin: 3rem auto;
`;
const Sell = () => {
    // Form State
    const [symbol, setSymbol] = useState<Stock["symbol"]>();
    const [amount, setAmount] = useState<Stock["amount"]>(1);
    // Buy Error/Success
    const [error, setError] = useState<string>("");
    const [successMsg, setSuccessMsg] = useState<string>("");

    // Handles buying stock
    const handleSell = async (e: FormEvent) => {
        e.preventDefault();

        // Buy stock
        sellStock(symbol, amount)
            .then((res) => setSuccessMsg(res.data.message))
            .catch((err) => {
                setError(err.response.data.message);
            });

        // Reset form
        setSymbol("");
        setAmount(1);
        setError("");
    };
    return (
        <StyledSell>
            <Form onSubmit={handleSell}>
                <h3>Sell</h3>
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
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                    />
                </label>
                <label>
                    Amount
                    <input
                        type="number"
                        onChange={(e) => setAmount(Number(e.target.value))}
                        value={amount}
                        min="1"
                    />
                </label>
                <input type="submit" value="Sell" />
            </Form>
        </StyledSell>
    );
};

export default Sell;
