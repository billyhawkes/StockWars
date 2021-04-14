// Import
import React, { FormEvent, useState } from "react";
import styled from "styled-components";

// Utils
import { getPrice } from "../utils/api";

const StyledPriceChecker = styled.div``;

// Component
const PriceChecker = () => {
    const [symbol, setSymbol] = useState<Stock["symbol"]>();
    const [price, setPrice] = useState<number | undefined>();

    const handlePriceCheck = async (e: FormEvent) => {
        e.preventDefault();
        getPrice(symbol).then((res) => setPrice(res));
    };

    return (
        <StyledPriceChecker>
            <form onSubmit={handlePriceCheck}>
                <label>
                    Symbol
                    <input
                        type="text"
                        onChange={(e) => setSymbol(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
            <h3>Price: {price}</h3>
        </StyledPriceChecker>
    );
};

export default PriceChecker;
function cost_from_symbol(symbol: string | undefined) {
    throw new Error("Function not implemented.");
}
