// Imports
import React, { useEffect, useState } from "react";
import { getStockShares } from "../../../helpers/api";
import Table from "../../styling/Table";

// Component
const SharesTable = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);

    // Gets all stocks on load
    useEffect(() => {
        getStockShares().then((stockList: Stock[]) => setStocks(stockList));
    }, []);

    return (
        <Table>
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Symbol</th>
                </tr>
            </thead>
            <tbody>
                {stocks.map((stock, index) => (
                    <tr key={index}>
                        <td>{stock.sum}</td>
                        <td>{stock.symbol}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default SharesTable;
