import styled from "styled-components";
import Button from "../Button/Button";
import { Typography } from "@mui/material";
import { useOutsideClick } from "../../hooks/useOutsideClicks";
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

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  useOutsideClick(onCloseModal);
  const handleConfirm = () => {
    onConfirm();
    onCloseModal();
  };
  return (
    <StyledConfirmDelete>
      <Typography>Delete {resourceName}</Typography>
      <Typography variant="subtitle1">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </Typography>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          variation="danger"
          disabled={disabled}
          onClick={handleConfirm}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
