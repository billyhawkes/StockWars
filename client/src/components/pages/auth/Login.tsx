// Import
import React from "react";
import Form from "../../styling/Form";
import styled from "styled-components";

const StyledLogin = styled.div`
    width: 500px;
    margin: 3rem auto;
`;

const Login = () => {
    return (
        <StyledLogin>
            <Form>
                <h3>Login</h3>
                <label>
                    Username
                    <input type="text" />
                </label>
                <label>
                    Password
                    <input type="text" />
                </label>
                <input type="submit" />
            </Form>
        </StyledLogin>
    );
};

export default Login;
