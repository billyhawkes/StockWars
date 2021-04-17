// Import
import React, { useState } from "react";
import Table from "../../styling/Table";

// Component
const Leaderboard = () => {
    const [users, setUsers] = useState<ClientUser[]>([]);
    return (
        <Table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Net Worth</th>
                </tr>
            </thead>
        </Table>
    );
};

export default Leaderboard;
