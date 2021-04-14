// Imports
import React from "react";
import Form from "../../styling/Form";
import styled from "styled-components";

const StyledRegister = styled.div`
    width: 500px;
    margin: 3rem auto;
`;
const Register = () => {
    return (
        <StyledRegister>
            <Form>
                <h3>Register</h3>
                <label>
                    Username
                    <input type="text" />
                </label>
                <label>
                    Email
                    <input type="email" />
                </label>
                <label>
                    Password
                    <input type="password" />
                </label>
                <label>
                    Password Check
                    <input type="password" />
                </label>
                <input type="submit" />
            </Form>
        </StyledRegister>
    );
};

export default Register;
