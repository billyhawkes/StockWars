// Import
import React, { useContext, useEffect, useState } from "react";
import { getUserInfo } from "../../helpers/api";
import UserContext from "../pages/auth/UserContext";

// Component
const Home = () => {
    const { user } = useContext(UserContext);
    const [cash, setCash] = useState();

    useEffect(() => {
        getUserInfo().then((res) => setCash(res.cash));
    });
    return (
        <div>
            <h2 style={{ margin: "2rem" }}>Home</h2>
            <h3>Logged in as {user.username}</h3>
            <h3>Cash: {cash}</h3>
        </div>
    );
};

export default Home;
