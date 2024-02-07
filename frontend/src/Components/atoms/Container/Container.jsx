import styled from "styled-components";
import { Stack } from "@mui/material";

const Container = styled(Stack)`
  margin: ${(props) => props.margin || "1rem auto"};
  text-align: center;
  margin-top: ${(props) => props.marginTop || "1rem"};
  margin-bottom: ${(props) => props.marginBottom || "1rem"};
  ${(props) => props.style || ""}
`;

export default Container;
