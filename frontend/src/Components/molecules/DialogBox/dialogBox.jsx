import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ButtonAtom from "../../atoms/Button";
import { Link } from 'react-router-dom';

export default function ModalDialog({buttonConfig}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log("handleClickOpen")
        buttonConfig.onClick();
        setOpen(true);

    };

    const handleClose = () => {
        console.log("handleClose")
        setOpen(false);
    };

    let subConfig = {
            ...buttonConfig.subButton, // Spread the subButton object
        onClick: handleClose, // Add the onClick function to the subButton object
    }
    
    let config = {
        ...buttonConfig, // Spread the subButton object
        onClick: handleClickOpen
    }

    const modalStyles = {
        margin: "0 auto",
        padding: "0",
        modalIconStyles: {
            margin: "0 auto",
            padding: "0",
            '& .MuiSvgIcon-root': {
                color: "green",
                size: "50px",
                marginTop: "2rem",
            },
        },
        titleStyles: {
            padding: "0 2rem",
            '& .MuiDialogContent-root': {
            },
        },

    }


    return (
        <>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                {buttonConfig.label}
            </Button> */}
            <ButtonAtom config={config} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={modalStyles.modalIconStyles}>
                    <CheckCircleIcon viewBox="0 0 75px 75px"/>
                </DialogTitle>
                <DialogContent sx={modalStyles.titleStyles}>
                    <DialogContentText  sx={{padding: 0}}>
                        {subConfig.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx = {modalStyles}>
                    {/* <Button onClick={handleClose} autoFocus>
                        {buttonConfig.buttonText}
                    </Button> */}
                    {
                        subConfig.type && subConfig.type === 'link' && subConfig.to !== "" ?
                            <Link to={subConfig.to}>
                                <ButtonAtom
                                    config={subConfig}
                                />
                            </Link>
                            :
                            <ButtonAtom
                                config={subConfig}
                            />
                    }
                </DialogActions>
            </Dialog>
        </>
    );
}
