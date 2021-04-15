// Import
import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

// Context
import UserContext from "../pages/auth/UserContext";

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
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 5rem;
        width: 600px;
        margin-right: 2rem;
        a.active {
            background-color: var(--secondary-color);
            padding: 0.4rem 0.8rem;
            border-radius: 0.3rem;
        }
    }
    .vertline {
        height: 50%;
        width: 2px;
        background-color: white;
    }
`;

// Component
const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const loggedIn = user.id && user.token && user.username;

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
                <div className="vertline"></div>
                {loggedIn ? (
                    <Link
                        to="/"
                        onClick={() => {
                            setUser({});
                            localStorage.setItem("auth-token", "");
                        }}
                    >
                        Log Out
                    </Link>
                ) : (
                    <>
                        <NavLink exact to="/login" activeClassName="active">
                            Login
                        </NavLink>
                        <NavLink exact to="/register" activeClassName="active">
                            Register
                        </NavLink>
                    </>
                )}
            </nav>
        </StyledHeader>
    );
};

export default Header;
