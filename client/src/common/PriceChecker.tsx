// Import
import React, { FormEvent, useState } from "react";
import styled from "styled-components";

// Utils
import { getPrice } from "../utils/api";

const StyledPriceChecker = styled.div`
    display: inline-block;
    text-align: left;
    padding: 1.5rem;
    border-radius: 0.4rem;
    background-color: var(--primary-color);
    color: white;
    h3 {
        text-align: center;
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

// Component
const PriceChecker = () => {
    const [symbol, setSymbol] = useState<Stock["symbol"]>();
    const [price, setPrice] = useState<number | undefined>();

    const handlePriceCheck = async (e: FormEvent) => {
        e.preventDefault();
        getPrice(symbol).then((res) => setPrice(res));

        // Reset form
        setSymbol("");
    };

    return (
        <StyledPriceChecker>
            <h3>Price Checker</h3>
            <form onSubmit={handlePriceCheck}>
                <label>
                    Stock Symbol
                    <input
                        type="text"
                        onChange={(e) => setSymbol(e.target.value)}
                        value={symbol}
                    />
                </label>
                <input type="submit" value="Check" />
            </form>
            {price && (
                <>
                    <hr style={{ margin: "1rem 0rem" }} />
                    <h4>Price: {price}</h4>
                </>
            )}
        </StyledPriceChecker>
    );
};

export default PriceChecker;
