// Imports
import React, { useEffect, useState } from "react";
import { getStockHistory } from "../../../helpers/api";
import Table from "../../styling/Table";

// Component
const LogTable = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);

    // Gets all stocks on load
    useEffect(() => {
        getStockHistory().then((stockList: Stock[]) => {
            console.log(stockList[0].date_time);
            setStocks(stockList);
        });
    }, []);

    return (
        <Table>
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
                    <tr key={stock.stock_id}>
                        <td>{stock.stock_id}</td>
                        <td>{stock.amount}</td>
                        <td>{stock.symbol}</td>
                        <td>{stock.cost}</td>
                        <td>{stock.date_time}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default LogTable;
