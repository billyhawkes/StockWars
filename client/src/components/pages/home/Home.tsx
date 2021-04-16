// Import
import React, { useContext } from "react";
import styled from "styled-components";
import UserContext from "../auth/UserContext";
import Profile from "./Profile";

const StyledHome = styled.div`
    h2 {
        margin: 3rem;
        text-align: center;
    }
`;

// Component
const Home = () => {
    const { user } = useContext(UserContext);

    return (
        <StyledHome>
            <h2>Home</h2>
            {user.id ? <Profile /> : <h2>Please Login or Register</h2>}
        </StyledHome>
    );
};

export default Home;
