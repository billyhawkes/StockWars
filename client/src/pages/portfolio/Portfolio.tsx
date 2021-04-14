// Imports
import React from "react";
import PriceChecker from "../../common/PriceChecker";
import StockTable from "./StockTable";

// Component
const Portfolio = () => {
    return (
        <div>
            <h2>Portfolio</h2>
            <StockTable />
            <PriceChecker />
        </div>
    );
};

export default Portfolio;
