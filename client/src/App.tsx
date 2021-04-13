// Imports
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Header from "./Header";
import Buy from "./pages/Buy";
import Portfolio from "./pages/portfolio/Portfolio";

function App() {
    return (
        <Router>
            <Header />
            <Switch>
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
