import styled from "styled-components";
import Label from "../Label/Label";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  &:last-child {
    padding-bottom: 0;
  }


  margin-bottom: 1rem;

`;

const Error = styled.span`
  font-size: 0.85rem;
  color: #fc4f4f;
`;

function FormRow({ label, error, children, style }) {
  return (
      <StyledFormRow
      style={{ ...style }}
      >
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

FormRow.StyledFormRow =  StyledFormRow;

export default FormRow;
