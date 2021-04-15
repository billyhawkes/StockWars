// Import
import React, { FormEvent, useContext, useState } from "react";
import Form from "../../styling/Form";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

// Utils
import { login } from "../../../helpers/auth";

// Context
import UserContext from "./UserContext";
import Error from "../../common/Error";

// Styling
const StyledLogin = styled.div`
    width: 500px;
    margin: 3rem auto;
`;

// Component
const Login = () => {
    const { setUser } = useContext(UserContext);
    // Form State
    const [identity, setIdentity] = useState<User["username"] | User["email"]>(
        ""
    );
    const [password, setPassword] = useState<User["password"]>("");
    // Error Message
    const [error, setError] = useState<string>("");

    //History
    const history = useHistory();

    // Handles login form
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        // Logs in user
        login(identity, password)
            .then((res) => {
                setUser({
                    id: res.id,
                    username: res.username,
                });
                history.push("/");
            })
            .catch((err) => setError(err.response.data.message));
    };

    return (
        <StyledLogin>
            <Form onSubmit={handleLogin}>
                <h3>Login</h3>
                {error && <Error error={error} setError={setError} />}
                <label>
                    Username/Email
                    <input
                        type="text"
                        onChange={(e) => setIdentity(e.target.value)}
                        value={identity}
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
