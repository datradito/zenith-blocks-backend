import styled from "styled-components";

const Textarea = styled.textarea`
  box-sizing: border-box;
  padding: 0.5rem;
  border: 0.08rem #2c2c2c solid;
  border-radius: 5px;
  background-color: #24292e;
  box-shadow: var(--shadow-sm);
  width: 100%;
  color: white;
  height: auto;

  &:focus {
    outline: none;
    border: 0.08rem #2c2c2c solid;
    box-shadow: var(--shadow-sm);
  }
`;

export default Textarea;
