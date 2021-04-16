// Imports
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Layout
import Header from "./components/layout/Header";

// Pages
import Buy from "./components/pages/Buy";
import Portfolio from "./components/pages/portfolio/Portfolio";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Sell from "./components/pages/Sell";

// Context
import UserContext from "./components/pages/auth/UserContext";
import { setupAuth } from "./helpers/auth";

function App() {
    // User Context state
    const [user, setUser] = useState<ClientUser>({
        id: undefined,
        username: undefined,
    });

    useEffect(() => {
        setupAuth().then((res) => {
            if (res) {
                setUser({
                    id: res.id,
                    username: res.username,
                });
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/buy">
                        <Buy />
                    </Route>
                    <Route path="/sell">
                        <Sell />
                    </Route>
                    <Route path="/portfolio">
                        <Portfolio />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
