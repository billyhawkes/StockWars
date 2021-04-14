// Imports
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Header from "./Header";
import Buy from "./pages/buy/Buy";
import Portfolio from "./pages/portfolio/Portfolio";
import Home from "./pages/home/Home";

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/buy">
                    <Buy />
                </Route>
                <Route path="/portfolio">
                    <Portfolio />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
