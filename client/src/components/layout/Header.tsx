// Import
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styling
const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    height: 5rem;
    background-color: var(--primary-color);
    color: white;

    nav {
        a {
            margin-right: 2rem;
        }
    }
`;

// Component
const Header = () => {
    return (
        <StyledHeader>
            <h1>Stock Wars</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/buy">Buy</Link>
                <Link to="/portfolio">Portfolio</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </StyledHeader>
    );
};

export default Header;
