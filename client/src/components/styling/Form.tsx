// Imports
import styled from "styled-components";

// Styling
const Form = styled.form`
    padding: 2rem;
    border-radius: 1rem;
    background-color: var(--primary-color);
    color: white;
    // Title
    h3 {
        text-align: center;
        margin-bottom: 1rem;
    }
    // Inputs
    label {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        input {
            margin-top: 0.5rem;
            padding: 0.2rem;
        }
    }
    // Submit button
    input[type="submit"] {
        margin-top: 1rem;
        border-radius: 0.3rem;
        background-color: var(--secondary-color);
        color: white;
        padding: 0.5rem;
        font-weight: bold;
    }
`;

export default Form;
