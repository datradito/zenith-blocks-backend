import Input from "../../atoms/Input/Input";
import styled from "styled-components";

const TokenInput = styled(Input)`
  background: transparent;
  border: none;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  flex-grow: 1;

  &:focus {
    outline: none;
    border: none;
  }

`;

export default TokenInput;

