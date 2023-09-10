import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarMessage = ({ open, onClose, severity, message }) => {
    // const [openState, setOpen] = React.useState(open);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpen(false);
    // };

    // React.useEffect(() => {
    //     if (open) {
    //         handleClick();
    //         const timer = setTimeout(() => {
    //             setOpen(false);
    //         }, 2000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [open]);
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={onClose}
                severity={severity}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default SnackbarMessage;
