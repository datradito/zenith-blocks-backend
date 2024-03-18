import styled from "styled-components";
import Button from "../../atoms/Button/Button";
import { Typography } from "@mui/material";

const StyledConfirmDelete = styled.div`
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

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  ...props
}) {

  const handleDelete = async() => {
    await onConfirm();
    onCloseModal();
  };
  return (
    <StyledConfirmDelete>
      <Typography as="h3">Delete {resourceName}</Typography>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      {props.context ? <p>{props.context}</p> : null}

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled}
          onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
