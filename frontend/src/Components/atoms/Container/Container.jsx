import styled from "styled-components";

const Container = styled.div`
  margin: ${(props) => props.margin || "1rem auto"};
  text-align: center;
  color: white;
  border: ${(props) => props.border || "0.095rem #2c2c2c solid"};
  margin-top: ${(props) => props.marginTop || "1rem"};
  margin-bottom: ${(props) => props.marginBottom || "1rem"};
  border-radius: 3px;
  padding: ${(props) => props.padding || "0"};
  ${(props) => props.style || ""}
`;

export default Container;
