import styled from "styled-components";

const StyledSelect = styled.select`
  box-sizing: border-box;
  border: 0.08rem #2c2c2c solid;
  background-color: #24292e;
  border-radius: 0.25rem;
  box-shadow: var(--shadow-sm);
  padding: 0.5rem;
  width: 100%;
  color: white;

  &:focus {
    outline: none;
    border: 0.08rem #2c2c2c solid;
    box-shadow: var(--shadow-sm);
  }

  &:disabled {
    color: grey;
  }

  /* Style the options within the select */
  option {
    font-size: 1.4rem;
    font-weight: 200;
    color: grey;
    /* Add any other option styles here */
  }
`;

function SelectDropdown({ children, ...rest }) {
  return <StyledSelect {...rest}>{children}</StyledSelect>;
}

export default SelectDropdown;
