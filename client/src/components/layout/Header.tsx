// Import
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

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
        a.active {
            background-color: var(--secondary-color);
            padding: 0.4rem 0.8rem;
            border-radius: 0.3rem;
        }
    }
`;

// Component
const Header = () => {
    return (
        <StyledHeader>
            <h1>Stock Wars</h1>
            <nav>
                <NavLink exact to="/" activeClassName="active">
                    Home
                </NavLink>
                <NavLink exact to="/buy" activeClassName="active">
                    Buy
                </NavLink>
                <NavLink exact to="/sell" activeClassName="active">
                    Sell
                </NavLink>
                <NavLink exact to="/portfolio" activeClassName="active">
                    Portfolio
                </NavLink>
                <NavLink exact to="/login" activeClassName="active">
                    Login
                </NavLink>
                <NavLink exact to="/register" activeClassName="active">
                    Register
                </NavLink>
            </nav>
        </StyledHeader>
    );
};

export default Header;
