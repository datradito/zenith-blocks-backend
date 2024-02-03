import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props?.sx?.backgroundColor || "#055FFC"};
  font-size: 0.85rem;
  text-transform: none;
  max-width: 10rem;
  width: ${(props) => props?.sx?.width || "10rem"};
  margin-right: ${(props) => props?.sx?.mr || "0"};
  border-radius: 50px;
  max-width: ${(props) => props?.sx?.width || "10rem"};
  padding: ${(props) => props?.sx?.padding || "0.5rem 1rem"};
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props?.sx?.hoverBackgroundColor || "#055FFC"};
  }

  &:disabled {
    background-color: ${(props) =>
      props?.sx?.disabledBackgroundColor || "#9bb8ff"};
  }
`;

export default Button;
