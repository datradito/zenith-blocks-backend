import styled from "styled-components";
import Label from "../Label/Label";

//   &:first-child {
//     padding-top: 0;
//   }


//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }


//   &:has(button) {
//     display: flex;
//     gap: 1.2rem;
//   }

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  flex:1,

  &:last-child {
    padding-bottom: 0;
  }
  
  &:nth-child(-n + 2) {
    flex-basis: 49%;
  }

  &:nth-child(n + 3) {
    flex-basis: 60%; /* Each item in the second row takes 100% */
  }

  &:nth-child(n + 4) {
    flex-basis: 38%; /* Each item in the second row takes 100% */
  }

  &:nth-child(n + 5) {
    flex-basis: 22%; /* Each item in the second row takes 100% */
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
