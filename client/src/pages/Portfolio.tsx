// Imports
import React, { useEffect, useState } from "react";
import axios from "axios";

// Component
const Portfolio = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);

    // Gets all stocks on load
    useEffect(() => {
        const getStocks = async () => {
            const res = await axios.get("/stocks");
            const data = await res.data;
            setStocks(data);
        };
        getStocks();
    }, []);

    return (
        <div>
            <h2>Portfolio</h2>
            <table>
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
            </table>
        </div>
    );
};

export default Portfolio;
