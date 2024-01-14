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