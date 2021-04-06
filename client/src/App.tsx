// Imports
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Header from "./Header";
import Buy from "./pages/Buy";

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/buy">
                    <Buy />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
