// Imports
import styled from "styled-components";

const Table = styled.table`
    margin: auto;
    border-collapse: collapse;
    thead {
        background-color: var(--primary-color);
        color: white;
    }
    th {
        padding: 0.3rem 1rem;
        border: 2px solid var(--primary-color);
    }
    td {
        padding: 0.2rem;
        text-align: center;
        border: 2px solid var(--primary-color);
    }
`;

export default Table;
