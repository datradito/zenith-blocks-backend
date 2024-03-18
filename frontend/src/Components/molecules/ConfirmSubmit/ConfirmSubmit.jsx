import React from "react";
import Button from "../../atoms/Button/Button";
import styled from "styled-components";

const StyledConfirmSubmit = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmSubmit() {
  return (
    <StyledConfirmSubmit>
      <p>
        Are you sure you want to submit this form? This action cannot be undone.
      </p>
      <div>
        <Button
          variation="secondary"
          disabled={false}
          onClick={() => console.log("Cancel")}
        >
          Cancel
        </Button>
        <Button
          variation="primary"
          disabled={false}
          onClick={() => console.log("Submit")}
        >
          Submit
        </Button>
      </div>
    </StyledConfirmSubmit>
  );
}
export default ConfirmSubmit;
