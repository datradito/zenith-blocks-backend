import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Stack, Box, Typography } from '@mui/material';
import ButtonGroup from '../../molecules/ButtonGroup/ButtonGroup';
import { alpha } from "@mui/material/styles";
import CircularIndeterminate from '../Loader/loader';
const ActionIconStyles = {
    padding: ".5rem",
    color: "#1A65C0",
    backgroundColor: "#242b33",
    borderRadius: "50%",
    "& .MuiSvgIcon-root": {
    color: "#1A65C0",
    fontSize: "0.75rem",
    },
};

let dialogContentStyle = {
  padding: "16px",
  backgroundColor: alpha("#0D0E10", 1),
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
  "& .MuiFormControlRoot": {
    width: "100%",
    color: "grey",
  },
  "& .MuiControlInput-root": {
    color: "grey",
  },
};
let dialogContainerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  backgroundColor: alpha("#1a1c1e", 0.9), // Make the dialog modal look darker
  alignItems: "center",
  border: "2px solid #2C2C2C",
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)", // Set a high z-index value to make sure it overlays other content
};

function CustomActionIcon({ invoiceId, onClick }) {

  const [openInvoiceActionModal, setOpenInvoiceActionModal] = React.useState(false);
  
  //move this to parent component so that actions can be controlled through json file like following
  const buttonConfig = [
    {
      variant: "outlined",
      size: "small",
      label: "Duplicate",
      innerText: "Duplicate",
      margin: "0.5rem",
      onClick: () => {
        setOpenInvoiceActionModal((prev) => !prev);
      },
      subButton: {
        variant: "outlined",
        size: "small",
        label: "Duplicated",
        innerText: "Duplicated Successfully",
        margin: "1.5rem",
        mr: "1.5rem",
        ml: "1.5rem",
        icon: <CircularIndeterminate />,
        onClick: () => {
          setOpenInvoiceActionModal((prev) => !prev);
        },
      },
    },
    {
      variant: "outlined",
      size: "small",
      label: "Delete",
      innerText: "Delete",
      margin: "0.5rem",
      onClick: () => {
        setOpenInvoiceActionModal((prev) => !prev);
      },
      subButton: {
        variant: "outlined",
        size: "small",
        label: "Deleted",
        innerText: "Deleted Successfully",
        margin: "1.5rem",
        mr: "1.5rem",
        ml: "1.5rem",
        icon: <CircularIndeterminate />,
        onClick: () => {
          setOpenInvoiceActionModal((prev) => !prev);
        },
      },
    },
  ];

    const handleClick = () => {
         invoiceId? setOpenInvoiceActionModal(!openInvoiceActionModal) : onClick();
    };
  
  if (invoiceId !== undefined) {
    return (
      <Stack direction="row" spacing={1}>
        <EditIcon sx={ActionIconStyles} onClick={handleClick} />
        <Box
          style={{
            ...dialogContainerStyle,
            display: openInvoiceActionModal ? "flex" : "none",
          }}
        >
          { openInvoiceActionModal && <Box sx={dialogContentStyle}>
            <Typography
              variant="h6"
              sx={{
                color: "grey",
                margin: "0.75rem",
                textAlign: "center",
                fontSize: "0.85rem",
              }}
            >
              Invoice Actions
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {buttonConfig.map((button, index) => {
                return <ButtonGroup buttonConfig={button} key={index} />;
              })}
            </Box>
          </Box>
          }
        </Box>
      </Stack>
    )
  } else {
      return (
        <EditIcon sx={ActionIconStyles} onClick={handleClick} />
      )


  }
    
}

  export default CustomActionIcon;