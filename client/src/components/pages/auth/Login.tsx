// Import
import React, { FormEvent, useState } from "react";
import Form from "../../styling/Form";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

// Utils
import { login } from "../../../helpers/api";

// Styling
const StyledLogin = styled.div`
    width: 500px;
    margin: 3rem auto;
`;

// Component
const Login = () => {
    // Form State
    const [user, setUser] = useState<User["username"] | User["email"]>("");
    const [password, setPassword] = useState<User["password"]>("");

    //History
    const history = useHistory();

    // Handles login form
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        // Logs in user
        login(user, password).then((res) => console.log(res));
        history.push("/");
    };

    return (
        <StyledLogin>
            <Form onSubmit={handleLogin}>
                <h3>Login</h3>
                <label>
                    Username/Email
                    <input
                        type="text"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                <input type="submit" />
            </Form>
        </StyledLogin>
    );
};

export default Login;
