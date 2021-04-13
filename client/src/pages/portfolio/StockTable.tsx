// Imports
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Utils
import { getAllStocks } from "../api";

// Styles
const StyledStockTable = styled.table`
    border-collapse: collapse;
    thead {
        background-color: var(--primary-color);
        color: white;
    }
    th {
        padding: 0.3rem 1rem;
    }
    td {
        padding: 0.2rem;
        text-align: center;
        border: 2px solid var(--primary-color);
    }
`;

// Props
interface Props {}

// Component
const StockTable = (props: Props) => {
    const [stocks, setStocks] = useState<Stock[]>([]);

    // Gets all stocks on load
    useEffect(() => {
        getAllStocks().then((stockList: Stock[]) => setStocks(stockList));
    }, []);

    return (
        <StyledStockTable>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Amount</th>
                    <th>Symbol</th>
                    <th>Cost</th>
                    <th>Date/Time</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map((stock) => (
                    <tr>
                        <td>{stock.stock_id}</td>
                        <td>{stock.amount}</td>
                        <td>{stock.symbol}</td>
                        <td>{stock.cost}</td>
                        <td>{stock.date_time}</td>
                    </tr>
                ))}
            </tbody>
        </StyledStockTable>
    );
};

export default StockTable;
