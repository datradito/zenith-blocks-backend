import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  width: ${props => props.width || "90%"};
  margin: ${props => props.margin || "1rem auto"};
  display: ${props => props.display || "flex"};
  flex-direction: ${props => props.flexDirection || "column"};
  justify-content: ${props => props.justifyContent || "space-between"};
  align-items: ${props => props.alignItems || "flex-end"};
  padding: ${props => props.padding || "0"};
  gap: ${props => props.gap || "0.5rem"};
  background-color: ${props => props.backgroundColor || "transparent"};
`;

export default List;

