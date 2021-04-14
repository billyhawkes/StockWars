// Imports
import React from "react";
import styled from "styled-components";

// Styling
const StyledSuccessMsg = styled.div`
    position: relative;
    display: inline-block;
    font-size: 0.8rem;
    border-radius: 0.5rem;
    padding: 0.5rem 2rem 0.5rem 0.5rem;
    background-color: #75ce88;
    color: #599749;
    // Close Button
    button {
        position: absolute;
        right: 0.5rem;
        top: 0.37rem;
        border: none;
        border-radius: 50%;
        background-color: transparent;
        color: #599749;
        font-size: 0.8rem;
    }
`;

// Props
interface Props {
    successMsg: string;
    setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
}

// Component
const SuccessMsg = ({ successMsg, setSuccessMsg }: Props) => {
    return (
        <StyledSuccessMsg>
            {successMsg}
            <button onClick={() => setSuccessMsg("")}>&#128473;</button>
        </StyledSuccessMsg>
    );
};

export default SuccessMsg;
