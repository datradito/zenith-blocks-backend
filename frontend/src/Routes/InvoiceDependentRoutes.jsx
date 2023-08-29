import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { Outlet } from "react-router-dom";

const InvoiceRoutes = ({ component: component, ...rest }) => {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const { proposal } = useSelector(state => state.currentProposal);
    const { Budget } = useSelector(state => state.currentBudget);

    useEffect(() => {
        if (proposal === null || Budget === null) {
            setShowSnackbar(true);
        } else {
            setShowSnackbar(false);
        }
    }, [proposal]);

    return !showSnackbar ? <Outlet /> : (
        <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="error">
                "Something went wrong. Please go back to home page and navigate again!"
            </Alert>
        </Snackbar>
    );
};

export default InvoiceRoutes;