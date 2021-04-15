// Imports
import React, { FormEvent, useState } from "react";
import Form from "../../styling/Form";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Error from "../../common/Error";

// Utils
import { register } from "../../../helpers/api";

// Styling
const StyledRegister = styled.div`
    width: 500px;
    margin: 3rem auto;
`;

const Register = () => {
    // Form State
    const [username, setUserName] = useState<User["username"]>("");
    const [email, setEmail] = useState<User["email"]>("");
    const [password, setPassword] = useState<User["password"]>("");
    const [passwordCheck, setPasswordCheck] = useState<User["password"]>("");
    // Error Message
    const [error, setError] = useState<string>("");

    //History
    const history = useHistory();

    // Handles Register form
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        // Logs in user
        register(username, email, password, passwordCheck)
            .then((res) => {
                console.log(res);
                history.push("/");
            })
            .catch((err) => setError(err.response.data.message));
    };
    return (
        <StyledRegister onSubmit={handleRegister}>
            <Form>
                <h3>Register</h3>
                {error && <Error error={error} setError={setError} />}
                <label>
                    Username
                    <input
                        type="text"
                        onChange={(e) => setUserName(e.target.value)}
                        value={username}
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
                <label>
                    Password Check
                    <input
                        type="password"
                        onChange={(e) => setPasswordCheck(e.target.value)}
                        value={passwordCheck}
                    />
                </label>
                <input type="submit" />
            </Form>
        </StyledRegister>
    );
};

export default Register;
