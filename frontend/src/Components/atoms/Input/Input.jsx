import styled from "styled-components";

const Input = styled.input`
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
    color: #24292f;
  }

  &:read-only {
    color: grey;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default Input;
