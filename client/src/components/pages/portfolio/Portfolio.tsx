// Imports
import styled from "styled-components";
import LogTable from "./LogTable";
import SharesTable from "./SharesTable";

const StyledPortfolio = styled.div`
    margin: 3rem auto;
    h3 {
        margin: 3rem;
        text-align: center;
    }
`;

// Component
const Portfolio = () => {
    return (
        <StyledPortfolio>
            <h3>Log</h3>
            <LogTable />
            <h3>Total Shares</h3>
            <SharesTable />
        </StyledPortfolio>
    );
};

export default Portfolio;
