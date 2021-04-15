// Import
import React, { useContext } from "react";
import UserContext from "../pages/auth/UserContext";

// Component
const Home = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <h2 style={{ margin: "2rem" }}>Home</h2>
            <h3>Logged in as {user.username}</h3>
        </div>
    );
};

export default Home;
