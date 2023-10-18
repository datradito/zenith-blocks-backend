import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ButtonAtom from "../../atoms/Button";
import { Link } from "react-router-dom";

const modalStyles = {
  margin: "0 auto",
  padding: "0",
  modalIconStyles: {
    margin: "0 auto",
    padding: "0",
    "& .MuiSvgIcon-root": {
      color: "green",
      size: "50px",
      marginTop: "2rem",
    },
  },
  titleStyles: {
    padding: "0 2rem",
    "& .MuiDialogContent-root": {},
  },
};

export default function ModalDialog({ buttonConfig }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("handleClose");
    setOpen(false);
  };

  let subConfig = {
    ...buttonConfig.subButton, // Spread the subButton object
    onClick: () => {
      buttonConfig.subButton.onClick();
      handleClose();
    }, // Add the onClick function to the subButton object
  };

  let config = {
    ...buttonConfig, // Spread the subButton object
    onClick: handleClickOpen,
  };

  return (
    <>
      <ButtonAtom config={config} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={modalStyles.modalIconStyles}>
          {subConfig.icon || <CheckCircleIcon viewBox="0 0 75px 75px" />}
        </DialogTitle>
        <DialogContent sx={modalStyles.titleStyles}>
          <DialogContentText sx={{ padding: 0 }}>
            {subConfig.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={modalStyles}>
          {subConfig.type &&
          subConfig.type === "link" &&
          subConfig.to !== "" ? (
            <Link to={subConfig.to}>
              <ButtonAtom config={subConfig} />
            </Link>
          ) : (
            <ButtonAtom config={subConfig} />
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}


