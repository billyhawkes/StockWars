// Imports
import React, { useContext, useEffect, useState } from "react";
import { getUserInfo } from "../../../helpers/api";
import UserContext from "../auth/UserContext";
import styled from "styled-components";

// Styling
const StyledProfile = styled.div`
    margin: auto;
    width: 300px;
    padding: 2rem;
    border-radius: 1rem;
    background-color: var(--primary-color);
    color: white;
    p {
        margin-top: 1rem;
    }
`;

const Profile = () => {
    const { user } = useContext(UserContext);
    const [info, setInfo] = useState({
        cash: undefined,
        stocksWorth: undefined,
        netWorth: undefined,
    });

    useEffect(() => {
        getUserInfo().then((res) => {
            setInfo(res);
        });
    }, []);
    return (
        <StyledProfile>
            <h3>Welcome, {user.username}</h3>
            <p>
                <strong>Cash:</strong> ${info.cash}
            </p>
            <p>
                <strong>Stock:</strong> ${info.stocksWorth}
            </p>
            <p>
                <strong>Net Worth:</strong> ${info.netWorth}
            </p>
        </StyledProfile>
    );
};

export default Profile;
