// Import
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getUserInfo } from "../../../helpers/api";
import UserContext from "../auth/UserContext";

const StyledHome = styled.div`
    h2 {
        margin: 3rem;
        text-align: center;
    }
    div {
        margin: auto;
        width: 300px;
        padding: 2rem;
        border-radius: 1rem;
        background-color: var(--primary-color);
        color: white;
        p {
            margin-top: 1rem;
        }
    }
`;

// Component
const Home = () => {
    const { user } = useContext(UserContext);
    const [cash, setCash] = useState();

    useEffect(() => {
        getUserInfo().then((res) => setCash(res.cash));
    });
    return (
        <StyledHome>
            <h2>Home</h2>
            {user.id ? (
                <div>
                    <h3>Welcome, {user.username}</h3>
                    <p>
                        <strong>Cash:</strong> {cash}
                    </p>
                </div>
            ) : (
                <h2>Please Login or Register</h2>
            )}
        </StyledHome>
    );
};

export default Home;
