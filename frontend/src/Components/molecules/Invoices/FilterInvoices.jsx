import React from 'react';
import Button from '../../atoms/Button/Button';
import styled from 'styled-components';
import List from '../../atoms/List/List';

const StyledButton = styled(Button)`
  background-color: ${(props) => (props.selected ? "#055FFC" : "transparent")};
  width: fit-content;

  &:hover {
    background-color: lightgrey;
  }
  &:focus {
    background-color: #272a2e;
  }
  &:active {
    background-color: #272a2e;
  }
`;

const StyledList = styled(List)`
    gap: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 0;
    width: 100%;
    justify-content: flex-start;
  `

function FilterInvoices( { refetchInvoices }) {
    const handleStatusClick = (status) => {
        // refetch({ budgetid: id, where: { status: status} });
        // // Run gql query with where clause and pass the clicked button's status to the query
        // // Replace `GET_INVOICES` with your actual gql query and update the variables accordingly
        // // const { data, loading, error } = useQuery(GET_INVOICES, {
        // //     variables: { status },
        // // });

        // // Handle the gql query response
        // // ...
        refetchInvoices(status);
    };

    return (
        <StyledList>
            <StyledButton onClick={() => handleStatusClick()}>All</StyledButton>
            <StyledButton onClick={() => handleStatusClick('Paid')}>Paid</StyledButton>
            <StyledButton onClick={() => handleStatusClick('Unpaid')}>Unpaid</StyledButton>
            <StyledButton onClick={() => handleStatusClick('Partial Paid')}>Partial Paid</StyledButton>
        </StyledList>
    );
}

export default FilterInvoices