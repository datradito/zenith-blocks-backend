import styled from "styled-components";
import { useTheme } from "@mui/material/styles";

const Button = styled.button`
  background-color: ${(props) => {
    const theme = useTheme();
    return props?.sx?.backgroundColor || theme.palette.button.primary;
  }};
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
    background-color: ${(props) => {
      const theme = useTheme();
      return theme.palette.action.hover;
    }};
  }

  &:disabled {
    background-color: ${(props) => {
      const theme = useTheme();
      return (
        props?.sx?.disabledBackgroundColor || theme.palette.action.disabled
      );
    }};
  }
`;

export default Button;
